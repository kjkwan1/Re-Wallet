export const ErrorTypes = ['HTTP', 'REPOSITORY', 'AUTHENTICATION'] as const;
export type ErrorType = typeof ErrorTypes[number];