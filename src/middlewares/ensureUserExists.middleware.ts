import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import AppError from '../errors'
import { iUserRepo } from '../interfaces/index'

const ensureUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User)

  const findUser: User | null = await userRepo.findOne({
    where: {
      id: Number(req.params.id),
    },
  })

  if (!findUser) throw new AppError('User not found', 404)

  return next()
}

export default ensureUserExists
