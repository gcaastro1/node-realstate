import { compare } from 'bcryptjs'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import AppError from '../../errors'
import { iLoginRequest, iUserRepo } from '../../interfaces'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const create = async (payload: iLoginRequest): Promise<string> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User)

  const findEmail: User | null = await userRepo.findOne({
    where: {
      email: payload.email,
    },
  })

  if (!findEmail) throw new AppError('Invalid credentials', 401)

  const matchPassword: boolean = await compare(
    payload.password,
    findEmail.password
  )

  if (!matchPassword) throw new AppError('Invalid credentials', 401)

  const token: string = jwt.sign(
    {
      admin: findEmail.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: findEmail.id.toString(),
    }
  )

  return token
}

export default { create }
