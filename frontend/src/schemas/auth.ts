import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(3, 'Name must be at least 3 characters'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/(?=(.*[a-z])+)/, 'Must contain at least one lowercase letter')
        .regex(/(?=(.*[A-Z])+)/, 'Must contain at least one uppercase letter')
        .regex(/(?=(.*[\d\W])+)/, 'Must contain at least one number or special character'),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type SigninFormData = z.infer<typeof signinSchema>;
