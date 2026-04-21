import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.').max(120, 'Title is too long.'),
  description: z.string().trim().max(1000, 'Description cannot exceed 1000 characters.').optional(),
  due_date: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  assigned_user_id: z.coerce.number().int().positive('Please choose a valid user.'),
});
