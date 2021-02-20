import { HttpStatus, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppError } from '../error/app-error';
import { ErrorType } from '../error/error-types';
import { Product } from '../types/product';
import { ProductPopularity } from '../types/product-popularity';
import { SortOptions } from '../types/sort-options';
import { DataService } from '../data/data.service';


@Injectable()
export class SortService {
    constructor(private readonly dataService: DataService) { }

    getProducts(sortOption: SortOptions): Observable<Product[]> {
        let sortedProducts = [];

        return this.dataService.getAllProducts().pipe(
            mergeMap(allProducts => {

                switch (sortOption) {
                    case SortOptions.PRICE_LOW_TO_HIGH:
                        sortedProducts = allProducts.sort((a, b) => a.price - b.price);
                        return of(sortedProducts);

                    case SortOptions.PRICE_HIGH_TO_LOW:
                        sortedProducts = allProducts.sort((a, b) => b.price - a.price);
                        return of(sortedProducts);

                    case SortOptions.NAME_ASCENDING:
                        sortedProducts = allProducts.sort((a, b) => {
                            if (a.name < b.name) { return -1; }
                            if (a.name > b.name) { return 1; }
                            return 0;
                        });
                        return of(sortedProducts);

                    case SortOptions.NAME_DESCENDING:
                        sortedProducts = allProducts.sort((a, b) => {
                            if (b.name < a.name) { return -1; }
                            if (b.name > a.name) { return 1; }
                            return 0;
                        });
                        return of(sortedProducts);

                    case SortOptions.RECOMMENDED:
                        return this.getRecommendedProducts(
                            allProducts
                        );

                    default:
                        throw new AppError(ErrorType.AppError_InvalidInput, HttpStatus.BAD_REQUEST);
                }
            }),
            catchError(() => {
                throw new AppError(ErrorType.AppError_InvalidInput, HttpStatus.BAD_REQUEST);
            }));
    }



    private getRecommendedProducts(allProducts: Product[]): Observable<Product[]> {

        return this.dataService.getShopperHistory().pipe(
            map(history => {
                let popularityArray: ProductPopularity[] = [];
                allProducts.forEach(prod => Array.prototype.push.apply(popularityArray,
                    [{
                        ...prod,
                        customers: []
                    }])
                )

                history.forEach(hElem => {
                    hElem.products.forEach(p => {
                        const index = popularityArray.findIndex(i => i.name === p.name);
                        if (index == -1) {
                            throw new AppError(ErrorType.AppError_ApiResource, HttpStatus.SERVICE_UNAVAILABLE);
                        } else {
                            if (!popularityArray[index].customers.includes(hElem.customerId)) {
                                Array.prototype.push.apply(popularityArray[index].customers, [hElem.customerId]);
                            }
                        }
                    })
                })

                popularityArray.sort((a, b) => b.customers.length - a.customers.length)
                popularityArray.forEach(i => delete i.customers);

                return popularityArray;
            }),
            catchError(() => {
                throw new AppError(ErrorType.AppError_InvalidInput, HttpStatus.BAD_REQUEST);
            })
        );
    }
}