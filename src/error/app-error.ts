import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorMap, ErrorType } from "./error-types";

export class AppError {

    constructor(errorType : ErrorType) {
        this.initError(errorType);
    }

    private initError(errorType : ErrorType) {
        const errorObject = ErrorMap.get(errorType);
        if(errorObject)
            throw new HttpException(errorObject.message, errorObject.statusCode);
        else 
            throw new HttpException("Invalid error type", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}