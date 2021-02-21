import { HttpStatus } from "@nestjs/common";

export enum ErrorType {
    AppError_ApiResource,
    AppError_InvalidInput 
}

export const ErrorMap = new Map();

ErrorMap.set(ErrorType.AppError_ApiResource, {
    message: 'Api returned with unexpected response',
    statusCode : HttpStatus.BAD_GATEWAY
});

ErrorMap.set(ErrorType.AppError_InvalidInput, {
    message: 'Invalid input',
    statusCode : HttpStatus.BAD_REQUEST
});
