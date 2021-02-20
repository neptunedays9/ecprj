import { HttpService, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { AppError } from "../error/app-error";
import { ErrorType } from "../error/error-types";
import { Product } from "../types/product";
import { ShopperHistory } from "../types/shopper-history";
import { Trolley } from "../types/trolley";

@Injectable()
export class DataService {
    private readonly token : string;

    constructor(
        private readonly httpService : HttpService
    ) {
        this.token = Buffer.from(process.env.USER_TOKEN, 'base64').toString('ascii');
    }

    getAllProducts() : Observable<Product[]> {
        return this.httpService.get(
            process.env.BASE_URL+process.env.PRODUCTS_API_PATH+`?token=${this.token}`)
            .pipe(
                map(response => response.data),
                catchError(err => {
                    throw new AppError(ErrorType.AppError_ApiResource, HttpStatus.SERVICE_UNAVAILABLE);
                })
            );
    }

    getShopperHistory() : Observable<ShopperHistory[]> {
        return this.httpService.get(
            process.env.BASE_URL+process.env.SHOPPER_HISTORY_API_PATH+`?token=${this.token}`)
            .pipe(
                map(response => response.data),
                catchError(err => {
                    throw new AppError(ErrorType.AppError_ApiResource, HttpStatus.SERVICE_UNAVAILABLE);
                })
            );
    }

    calculateTrolleyTotal(trolley : Trolley) : Observable<number> {
        return this.httpService.post(
            process.env.BASE_URL+process.env.TROLLEY_CALCULATOR_API_PATH+`?token=${this.token}`,
            trolley)
            .pipe(
                map(response => response.data),
                catchError(err => {
                    throw new AppError(ErrorType.AppError_ApiResource, HttpStatus.SERVICE_UNAVAILABLE);
                })
            );
    }

}

