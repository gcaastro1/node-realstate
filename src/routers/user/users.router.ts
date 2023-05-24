import { Router } from 'express'
import { usersController } from '../../controllers'
import {
  ensureDataIsValid,
  ensureEmailExists,
  ensureIsAdmin,
  ensureTokenIsValid,
  ensureUserExists,
} from '../../middlewares'
import { createUserSchema, updateUserSchema } from '../../schemas'

const usersRouter: Router = Router()

usersRouter.post(
  '',
  ensureDataIsValid(createUserSchema),
  ensureEmailExists,
  usersController.create
)
usersRouter.get('', ensureTokenIsValid, ensureIsAdmin, usersController.read)
usersRouter.patch(
  '/:id',
  ensureTokenIsValid,
  ensureUserExists,
  ensureDataIsValid(updateUserSchema),
  usersController.update
)
usersRouter.delete(
  '/:id',
  ensureTokenIsValid,
  ensureUserExists,
  ensureIsAdmin,
  usersController.remove
)

export default usersRouter
