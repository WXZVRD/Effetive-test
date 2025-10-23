import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import {AuthenticatedRequest} from "../types";
import {JwtPayload} from "../utils";
import {UserRole} from "../../user";

const JWT_SECRET = process.env.JWT_SECRET || 'closure';

export const checkAccess = (roles: UserRole[] = []) =>
    (req: Request & AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const auth_headers = req.headers.authorization
            if (!auth_headers || !auth_headers.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'No or invalid Authorization header' });
            }

            const token: string = auth_headers.replace('Bearer ', '');

            const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;

            if (roles.length > 0 && !roles.includes(decoded.role as UserRole)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            req.user = decoded

            console.log('token: ', token)

            next();
        } catch (err) {
            console.error('Auth error:', err);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
