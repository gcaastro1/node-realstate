import { Router } from 'express'
import { categoriesController } from '../../controllers'
import {
  ensureDataIsValid,
  ensureIsAdmin,
  ensureTokenIsValid,
} from '../../middlewares'
import { createCategorySchema } from '../../schemas'

const categoriesRouter: Router = Router()

categoriesRouter.post(
  '',
  ensureDataIsValid(createCategorySchema),
  ensureTokenIsValid,
  ensureIsAdmin,
  categoriesController.create
)
categoriesRouter.get('/', categoriesController.read)

categoriesRouter.get('/:id/realEstate', categoriesController.readProperties)

export default categoriesRouter
