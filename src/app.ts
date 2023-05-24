import express, { Application } from 'express'
import 'express-async-errors'
import { handleErrors } from './middlewares'
import {
  categoriesRouter,
  loginRouter,
  realEstateRouter,
  schedulesRouter,
  usersRouter,
} from './routers'

const app: Application = express()
app.use(express.json())

app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/categories', categoriesRouter)
app.use('/realEstate', realEstateRouter)
app.use('/schedules', schedulesRouter)

app.use(handleErrors)

export default app
