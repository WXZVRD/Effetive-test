import {Router} from "express";
import authRouter from "../modules/auth/auth.router";
import userRouter from "../modules/user/user.router";


const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router