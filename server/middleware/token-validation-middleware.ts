require('dotenv').config();
import {OwnError} from '../error-handler/own-error';
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        throw new OwnError('You must send authorization headers', 401);
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        throw new OwnError('User hasn\'t  authorized, yet', 403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            throw new OwnError(`Authorization error, check jwt`, 401);
        }
        if (next) {
            req.user = payload;
            next();
        }
    });
};

export {verifyToken};