import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import {UserEntity} from "./entity";

class UserController {
    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: number = Number(req.params.userId);
            const user: UserEntity = await userService.getOne(userId);

            res.status(200).json({
                message: 'User fetched successfully',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users: UserEntity[] | null = await userService.getAll();

            res.status(200).json({
                message: 'Users fetched successfully',
                data: users,
            });
        } catch (err) {
            next(err);
        }
    }

    async block(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const targetUserId: number = Number(req.params.userId);
            const result: UserEntity = await userService.block(targetUserId);

            res.status(200).json({
                message: 'User has been blocked successfully',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
}

export const userController = new UserController();