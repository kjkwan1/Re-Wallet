import { catchError, firstValueFrom, Observable, of, throwError } from "rxjs";

export function promisify<T>(data: Observable<T>, errorCallback?: (error: unknown) => void): Promise<T> {
    return firstValueFrom(
        data.pipe(
            catchError((error: unknown) => {
                if (errorCallback) {
                    errorCallback(error);
                }

                return throwError(() => error);
            })
        )
    )
}