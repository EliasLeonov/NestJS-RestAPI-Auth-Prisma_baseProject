import {HttpException, HttpStatus} from "@nestjs/common";

export class ApiError extends HttpException {
    constructor(public readonly code: number, public readonly message: string) {
        super(message, code);
    }
}

export class InvalidModelError extends ApiError {
    constructor(model: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, `Invalid Model Error: model ${model} is invalid`);
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}