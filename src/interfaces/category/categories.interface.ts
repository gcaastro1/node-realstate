import { Repository } from 'typeorm'
import { z } from 'zod'
import { Category } from '../../entities'
import {
  allCategoriesSchema,
  categorySchema,
  createCategorySchema,
  updateUserSchema,
} from '../../schemas'

export type iCategory = z.infer<typeof categorySchema>
export type iCategoryCreate = z.infer<typeof createCategorySchema>
export type iCategoryUpdate = z.infer<typeof updateUserSchema>
export type iCategoryRead = z.infer<typeof allCategoriesSchema>
export type iCategoryRepo = Repository<Category>
