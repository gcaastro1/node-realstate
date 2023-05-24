import { Router } from 'express'
import { schedulesController } from '../../controllers'
import {
  ensureDataIsValid,
  ensureIsAdmin,
  ensureTokenIsValid,
} from '../../middlewares'
import { createScheduleSchema } from '../../schemas'

const schedulesRouter: Router = Router()

schedulesRouter.post(
  '',
  ensureTokenIsValid,
  ensureDataIsValid(createScheduleSchema),
  schedulesController.create
)
schedulesRouter.get(
  '/realEstate/:id',
  ensureTokenIsValid,
  ensureIsAdmin,
  schedulesController.read
)

export default schedulesRouter
