import {Router} from 'express';
import UserController from '../controllers/user-controller';
import {loginValidation, signUpValidation, updateInfoValidation} from '../middleware/user-validation-middleware';
import ClassController from '../controllers/class-controller';
import {verifyToken} from '../middleware/token-validation-middleware';
const asyncHandler = require('express-async-handler')

const router: Router = new Router();
const classController = new ClassController();
const userController = new UserController();

router.post('/login', loginValidation, asyncHandler(userController.loginController));
router.post('/signup',signUpValidation, asyncHandler(userController.signUpController));
router.put('/update', verifyToken, updateInfoValidation, asyncHandler(userController.updateInfoController));
router.get('/heroes', asyncHandler(classController.getListOfHeroesController));

export default router;