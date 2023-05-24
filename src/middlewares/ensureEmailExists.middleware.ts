import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import AppError from '../errors'
import { iUserRepo } from '../interfaces/index'

const ensureEmailExists = async (req: Request, res: Response, next: NextFunction) => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User)

  const findEmail: User | null = await userRepo.findOne({
    where: {
      email: req.body.email
    }
  })

  if (findEmail) throw new AppError('Email already exists', 409)

  return next()
}

export default ensureEmailExists
