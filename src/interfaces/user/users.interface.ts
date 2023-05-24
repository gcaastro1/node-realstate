import { DeepPartial, Repository } from 'typeorm'
import { z } from 'zod'
import { User } from '../../entities'
import {
  allUsersSchema,
  createUserSchema,
  userSchema,
  returnUserSchemaDate,
  returnUserSchemaString
} from '../../schemas'

export type iUser = z.infer<typeof userSchema>
export type iUserCreate = z.infer<typeof createUserSchema>
export type iUserWithoutPassDate = z.infer<typeof returnUserSchemaDate>
export type iUserWithoutPassString = z.infer<typeof returnUserSchemaString>
export type iUserUpdate = DeepPartial<User>
export type iUserReadAll = z.infer<typeof allUsersSchema>
export type iUserRepo = Repository<User>
