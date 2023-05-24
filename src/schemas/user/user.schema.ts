import { hashSync } from 'bcryptjs'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(0).max(45),
  email: z.string().max(45).email(),
  admin: z.boolean().default(false),
  password: z.string().max(120),
})

export const createUserSchema = userSchema.omit({
  id: true,
})

export const updateUserSchema = userSchema
  .omit({
    id: true,
    admin: true,
  })
  .partial()

export const returnUserSchemaDate = userSchema
  .extend({
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true })

export const returnUserSchemaString = userSchema
  .extend({
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true })

export const allUsersSchema = z.array(returnUserSchemaDate)
