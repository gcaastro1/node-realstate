import { z } from 'zod'
import { categorySchema } from '../category/category.schema'

export const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
})

export const createAddressSchema = addressSchema.omit({ id: true })

export const propertySchema = z.object({
  id: z.number(),
  value: z.string().or(z.number().multipleOf(0.01)),
  size: z.number().gt(0),
  sold: z.boolean().optional().default(false),
})

export const createPropertySchema = propertySchema
  .omit({
    id: true,
    sold: true,
  })
  .extend({
    address: createAddressSchema,
    categoryId: z.number(),
  })

export const returnPropertySchema = propertySchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
  category: categorySchema,
  address: addressSchema,
})

export const returnManyPropertiesSchema = returnPropertySchema
  .omit({ category: true })
  .array()
