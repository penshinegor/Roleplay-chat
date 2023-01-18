import {NextFunction, Request, Response} from 'express';
import {OwnError} from './own-error';

function errorHandler(err: OwnError, req: Request, res: Response, next: NextFunction) {
    console.warn('error', '', {
        message: 'Error Handler',
        action: `${req ? req.method : 'WebSocket error'} : ${req ? req.url : '/'}`,
        err,
    });
    if (!req && !next) {
        if (err.getErrorStatusCode() !== 1011) {
            res.send(err.message);
            res.close();
            return;
        }
        res.send(err.message);
        return;
    }
    if (err instanceof OwnError) {
        res.status(err.getErrorStatusCode()).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: 'Something went wrong, sorry' });
}

export default errorHandler;