import { Request, Response, NextFunction } from 'express';
import {AuthenticatedRequest} from "../types";
import {JwtPayload} from "../utils";
import {UserRole} from "../../user";

export const checkAdminOrSelf = (roles: UserRole[] = []) =>
    (req: Request & AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const userData: JwtPayload = req.user as JwtPayload;

            const requestUserId: number = Number(req.params.userId);

            if (userData.role === UserRole.ADMIN) {
                console.error('Admin user call:', userData.id);
                return next()
            }

            if (userData.id === requestUserId) {
                console.error('Self user call:', userData.id);
                return next()
            }

            return res.status(403).json({
                message: 'Access denied. Only admin or owner can perform this action.',
            });
        } catch (err) {
            console.error('Auth error:', err);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
