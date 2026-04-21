import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(3, 'Username must be at least 3 characters.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const registerSchema = z
  .object({
    username: z.string().trim().min(3, 'Username must be at least 3 characters.'),
    email: z.email('Please provide a valid email address.'),
    first_name: z.string().trim().max(150, 'First name is too long.').optional(),
    last_name: z.string().trim().max(150, 'Last name is too long.').optional(),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    password2: z.string().min(8, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.password2, {
    path: ['password2'],
    message: 'Passwords do not match.',
  });
