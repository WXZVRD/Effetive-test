import { z } from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    birth: z.string(),
    firstName: z.string().min(2),
    middleName: z.string().optional(),
    secondName: z.string().min(2),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
