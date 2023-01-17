import {Router} from 'express';
import UserController from '../controllers/user-controller';
import {loginValidation, signUpValidation, updateInfoValidation} from '../middleware/user-validation-middleware';
import ClassController from '../controllers/class-controller';

const router: Router = new Router();
const classController = new ClassController();
const userController = new UserController();

router.post('/login', loginValidation, userController.loginController);
router.post('/signup',signUpValidation, userController.signUpController);
router.put('/update', updateInfoValidation, userController.updateInfoController);
router.get('/heroes', classController.getListOfHeroesController);

export default router;