import {Router} from 'express';
import {authController} from "./auth.controller";
import {checkAccess} from "./middlewares";
import {LoginSchema, RegisterSchema} from "./dto";
import {formValidate} from "../../middlewares/form-validation.middleware";
import {UserRole} from "../user";

const router = Router();

router.post('/check-access', checkAccess([UserRole.USER]), (req, res, next) => {
    console.log('END')
    return res.status(201).json({
        message: "OK"
    })
}
);
router.post('/register', formValidate(RegisterSchema), (req, res, next) => authController.register(req, res, next));
router.post('/login', formValidate(LoginSchema), (req, res, next) => authController.login(req, res, next));

export default router;
