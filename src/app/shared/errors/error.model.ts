import { ErrorType } from "./error.type";

export interface ErrorMetadata {
    timestamp: Date;
    code?: string;
    subType?: string;
    context?: Record<string, unknown>;
}

export abstract class BaseError extends Error {
    abstract override name: ErrorType;

    public readonly metadata: ErrorMetadata;
    public readonly cause: unknown;

    constructor(
        message: string,
        metadata?: Partial<ErrorMetadata>,
        cause?: Error
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.metadata = {
            timestamp: new Date(),
            ...metadata
        };

        if (cause) {
            this.cause = cause;
            this.stack = cause.stack;
        }
    }

    public toJSON() {
        return {
            name: this.name,
            message: this.message,
            metadata: this.metadata,
            stack: this.stack
        };
    }
}