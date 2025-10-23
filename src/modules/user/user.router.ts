import { Router } from "express";
import { userController } from "./user.controller";
import {UserRole} from "./types";
import {checkAccess, checkAdminOrSelf} from "../auth/middlewares";

const router = Router();

router.post(
    '/block-user/:userId',
    checkAccess([UserRole.ADMIN, UserRole.USER]),
    checkAdminOrSelf(),
    (req, res, next) => userController.block(req, res, next)
);

router.get(
    '/get-user/:userId',
    checkAccess([UserRole.ADMIN, UserRole.USER]),
    checkAdminOrSelf(),
    (req, res, next) => userController.getOne(req, res, next)
);

router.get(
    '/get-users',
    checkAccess([UserRole.ADMIN]),
    (req, res, next) => userController.getAll(req, res, next)
);

export default router;
