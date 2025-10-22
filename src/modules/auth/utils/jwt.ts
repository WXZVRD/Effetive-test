import jwt from 'jsonwebtoken';
import { UserEntity } from '../../user/entity/user.entity';

const JWT_SECRET = process.env.JWT_SECRET || 'closure';
const JWT_EXPIRES_IN = '1h';

export interface JwtPayload {
    id: number;
    email: string;
    role: string;
}

export const generateToken = (user: UserEntity): string => {
    const payload: JwtPayload = {
        id: user.id!,
        email: user.email!,
        role: user.role!,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
