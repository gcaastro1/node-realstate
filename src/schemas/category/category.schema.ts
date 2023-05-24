import { z } from 'zod'

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const createCategorySchema = categorySchema.omit({
  id: true,
})

export const allCategoriesSchema = z.array(categorySchema)
