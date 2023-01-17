import {OwnError} from '../error-handler/own-error';
import {NextFunction, Request, Response} from 'express';

const regularEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regularPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
const regularUsername = /^[a-zA-Z0-9]+$/;

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
        throw new OwnError('Email or password was missed', 400);
    }
    if (!req.body.email.match(regularEmail) || !req.body.password.match(regularPassword)) {
        throw new OwnError('Invalid email or password', 400);
    }
    next();
}
const signUpValidation = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.repeatedPassword || !req.body.id) {
        throw new OwnError('Missing parameters', 400);
    }
    if (req.body.password !== req.body.repeatedPassword || (Number(req.body.id) > 3 && Number(req.body.id) < 1)) {
        throw new OwnError('Passwords not equal or wrong id', 400);
    }
    if (!req.body.username.match(regularUsername) || !req.body.email.match(regularEmail) || !req.body.password.match(regularPassword)) {
        throw new OwnError('Invalid username, email or password', 400);
    }
    next();
}
const updateInfoValidation = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username || !req.body.pastPassword || !req.body.newPassword || !req.body.repeatedPassword || !req.body.id) {
        throw new OwnError('Missing parameters', 400);
    }
    if (!req.body.username.match(regularUsername) || !req.body.newPassword.match(regularPassword)) {
        throw new OwnError('Invalid username or new password', 400);
    }
    if (req.body.newPassword !== req.body.repeatedPassword || (Number(req.body.id) > 3 && Number(req.body.id) < 1)) {
        throw new OwnError('Passwords not equal or wrong id', 400);
    }
    next();
}

export {loginValidation, signUpValidation, updateInfoValidation};