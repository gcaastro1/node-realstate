import {
  userSchema,
  createUserSchema,
  returnUserSchemaString,
  returnUserSchemaDate,
  allUsersSchema,
  updateUserSchema,
} from './user/user.schema'
import {
  categorySchema,
  createCategorySchema,
  allCategoriesSchema,
} from './category/category.schema'
import { createLoginSchema } from './login/login.schema'
import {
  propertySchema,
  createPropertySchema,
  returnPropertySchema,
  addressSchema,
  createAddressSchema,
  returnManyPropertiesSchema,
} from './realEstate/realEstate.schema'

import { scheduleSchema, createScheduleSchema } from './schedule/schedule.schema'

export {
  userSchema,
  createUserSchema,
  returnUserSchemaString,
  returnUserSchemaDate,
  allUsersSchema,
  updateUserSchema,
  createLoginSchema,
  categorySchema,
  createCategorySchema,
  allCategoriesSchema,
  addressSchema,
  createAddressSchema,
  propertySchema,
  createPropertySchema,
  returnPropertySchema,
  scheduleSchema,
  createScheduleSchema,
}
