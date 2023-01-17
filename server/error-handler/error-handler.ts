import {NextFunction, Request, Response} from 'express';
import {OwnError} from './own-error';

function errorHandler(err: OwnError, req: Request, res: Response, next: NextFunction) {
    console.warn('error', '', {
        message: 'Error Handler',
        action: `${req ? req.method : 'WebSocket message'} : ${req ? req.url : '/'}`,
        err,
    });
    if (!req && !next) {
        res.send(err.message);
        return;
    }
    res.status(err.getErrorStatusCode()).send(err.message);
}

export default errorHandler;