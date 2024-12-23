import { z } from 'zod'

export const createTaskSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required")
})
