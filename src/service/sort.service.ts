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

    /**
     * sorts the products based on the option provided
     * @param sortOption 
     */
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
                        throw new AppError(ErrorType.AppError_InvalidInput);
                }
            }),
            catchError(() => {
                throw new AppError(ErrorType.AppError_InvalidInput);
            }));
    }

    /**
     * sorts the products based on the shopper history
     * @param allProducts 
     */
    private getRecommendedProducts(allProducts: Product[]): Observable<Product[]> {

        return this.dataService.getShopperHistory().pipe(
            map(history => {

                //initialise popularity array from the products array 
                let popularityArray: ProductPopularity[] =
                    allProducts.map(prod => {
                        return {
                            ...prod,
                            customers: []
                        }
                    });

                //populate the unique customerIds in the popularityArray
                popularityArray.map(pElem => {
                    history.map(hElem => {
                        if (hElem.products.findIndex(i => i.name === pElem.name) !== -1) {
                            if (pElem.customers.findIndex(i => i === hElem.customerId) === -1) {
                                pElem.customers.push(hElem.customerId);
                            }
                        }
                    })
                });

                //sort based on the number of customerIds purchased that product
                popularityArray
                    .sort((a, b) => b.customers.length - a.customers.length)
                    .map(i => delete i.customers);

                return popularityArray;
            }),
            catchError(() => {
                throw new AppError(ErrorType.AppError_InvalidInput);
            })
        );
    }
}