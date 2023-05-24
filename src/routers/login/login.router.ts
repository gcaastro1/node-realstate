import { Router } from 'express'
import { loginController } from '../../controllers'
import { ensureDataIsValid } from '../../middlewares'
import { createLoginSchema } from '../../schemas'

const loginRouter: Router = Router()

loginRouter.post(
  '',
  ensureDataIsValid(createLoginSchema),
  loginController.create
)

export default loginRouter
