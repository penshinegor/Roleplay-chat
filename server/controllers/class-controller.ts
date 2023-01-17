import ClassService from '../services/class-service';
import {OwnError} from '../error-handler/own-error';
import {Request, Response} from 'express';

const classService = new ClassService();

class ClassController {
    public getListOfHeroesController = (req: Request, res: Response) => {
        const list = classService.getListOfHeroes();
        if (!list) {
            throw new OwnError('Server getting error', 500);
        }
        res.json(list);
    }
}

export default ClassController;