import { Router } from 'express'
import { realEstateController } from '../../controllers'
import {
  ensureDataIsValid,
  ensureIsAdmin,
  ensureTokenIsValid,
} from '../../middlewares'
import { createPropertySchema } from '../../schemas'

const realEstateRouter: Router = Router()

realEstateRouter.post(
  '',
  ensureTokenIsValid,
  ensureIsAdmin,
  ensureDataIsValid(createPropertySchema),
  realEstateController.create
)
realEstateRouter.get('', realEstateController.read)

export default realEstateRouter
