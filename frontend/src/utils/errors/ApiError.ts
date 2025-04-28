class ApiError extends Error {
    readonly statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode
        this.message = message;
    }
}
export default ApiError;