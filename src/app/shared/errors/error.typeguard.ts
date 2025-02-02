import { BaseError } from "@shared/errors/error.model";
import { ErrorType, ErrorTypes } from "@shared/errors/error.type";

export const isError = (error: unknown): error is Error =>
    error instanceof Error;

export const isErrorType = (name: string): name is ErrorType =>
    ErrorTypes.includes(name as ErrorType);

export const isBaseError = (error: unknown): error is BaseError =>
    isError(error) && isErrorType(error.name);

export const isErrorWithCode = (
    error: unknown
): error is BaseError & { metadata: { code: string } } =>
    isBaseError(error) && !!error.metadata.code;