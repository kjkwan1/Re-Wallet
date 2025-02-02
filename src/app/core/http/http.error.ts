import { BaseError, ErrorMetadata } from "@shared/errors/error.model";
import { ErrorType } from "@shared/errors/error.type";

export class HttpError extends BaseError {
    override name: ErrorType = 'HTTP';

    constructor(
        message: string,
        public readonly statusCode: number,
        metadata?: Partial<ErrorMetadata>
    ) {
        super(message, {
            ...metadata,
            code: `HTTP_${statusCode}`
        });
    }
}