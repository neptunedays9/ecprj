import { HttpException, HttpStatus } from "@nestjs/common";

export class AppError {
    constructor(errorMessage : string, errorCode : HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new HttpException(errorMessage, errorCode);
    }
}