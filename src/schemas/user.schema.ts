import { z } from 'zod'

export const createUserSchema = z.object({
  firstname: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long")
})


export const signInUserSchema = z.object({  
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long")
})