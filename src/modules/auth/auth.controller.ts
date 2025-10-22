import { Request, Response, NextFunction } from 'express';
import {UserEntity} from "../user/entity/user.entity";
import {authService} from "./auth.service";

class AuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: UserEntity = await authService.register(req.body);

            res.json({ message: 'User have been registered!', data: user });
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.json({ message: 'Hello, world LOGIN' });
        } catch (err) {
            next(err);
        }
    }
}

export const authController = new AuthController()