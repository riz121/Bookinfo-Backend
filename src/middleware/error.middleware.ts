import { Request, Response, NextFunction } from "express";

import HttpError from "../utils/httpError.error"
import logger from "./logger.middleware";

const errorMiddleware = (
    error: HttpError,
    request: Request,
    response: Response,
    _next: NextFunction
): void => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "An error occurred!";

    logger.error(`Caught http error with statusCode ${statusCode} and message ${message}.`);
    logger.error(error.stack);
    response.status(statusCode).json({
        message: message
    });
}

export default errorMiddleware;