import UserService from '../services/user-service';
import {OwnError} from '../error-handler/own-error';
import {Request, Response} from 'express';

const userService = new UserService();

class UserController {
    public loginController = async (req: Request, res: Response) => {
        const token =  await userService.login(req);
        if (!token) {
            throw new OwnError('Server login error', 500);
        }
        res.json({token: token});
    }
    public signUpController = async (req: Request, res: Response) => {
        const user = await userService.signUp(req);
        if (!user) {
            throw new OwnError('Server signing up error', 500);
        }
        res.json(user);
    }
    public updateInfoController = async (req: Request, res: Response) => {
        const updateUser = await userService.updateInfo(req);
        if (!updateUser) {
            throw new OwnError('Server updating info error', 500);
        }
        res.json(updateUser);
    }
}

export default UserController;