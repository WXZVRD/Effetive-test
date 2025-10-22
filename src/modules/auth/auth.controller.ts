import { Request, Response, NextFunction } from 'express';

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.json({ message: 'Hello, world REGISTER' });
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