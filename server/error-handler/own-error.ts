class OwnError extends Error {
    private statusCode: number | null;

    constructor(message: string, status: number) {
        super(message);
        this.statusCode = status;
    }

    getErrorStatusCode(): number {
        return this.statusCode;
    }
}

export {OwnError};


