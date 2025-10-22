import { Router } from 'express';
import { authController } from "./auth.controller";
import {formValidate} from "../../middlewares/form-validation.middleware";
import {RegisterSchema} from "./dto/register.dto";

const router = Router();

router.post('/register', formValidate(RegisterSchema), (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));

export default router;
