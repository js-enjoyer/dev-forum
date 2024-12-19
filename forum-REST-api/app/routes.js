import { Router } from "express";

import questionsController from './controllers/questions-controller.js'
import authController from './controllers/user-controller.js'
import answersController from './controllers/answers-controller.js'

const router = Router();

router.use('/answers', answersController)
router.use('/questions', questionsController);
router.use('/user', authController);


export default router;