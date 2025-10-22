import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

class AuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.register(req.body);
            res.status(201).json({
                message: 'User registered successfully',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json({
                message: 'Login successful',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
}

export const authController = new AuthController();