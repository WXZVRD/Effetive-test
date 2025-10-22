import { Request, Response, NextFunction } from 'express';
import {ZodSchema} from "zod";

export const formValidate = (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map(e => ({
                path: e.path.join('.'),
                message: e.message,
            }));

            return res.status(400).json({
                status: 400,
                message: 'Validation error',
                errors,
            });
        }

        req.body = result.data;
        next();
    };
