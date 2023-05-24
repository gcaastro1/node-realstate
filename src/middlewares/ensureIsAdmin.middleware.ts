import { Request, Response, NextFunction, request } from 'express'
import AppError from '../errors'
import 'dotenv/config'

const ensureIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  let admin = request.user.admin

  if (!admin) throw new AppError('Insufficient permission', 403)

  next()
}

export default ensureIsAdmin
