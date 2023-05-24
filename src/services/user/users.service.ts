import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import AppError from '../../errors'
import {
  iUserCreate,
  iUserReadAll,
  iUserRepo,
  iUserUpdate,
  iUserWithoutPassDate,
} from '../../interfaces'
import { allUsersSchema, returnUserSchemaDate } from '../../schemas'

const create = async (payload: iUserCreate): Promise<iUserWithoutPassDate> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User)

  const user = userRepo.create(payload)

  await userRepo.save(user)

  return returnUserSchemaDate.parse(user)
}

const read = async (): Promise<iUserReadAll> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User)

  const users: Array<User> = await userRepo.find({})

  return allUsersSchema.parse(users)
}

const update = async (
  userId: number,
  tokenId: number,
  admin: boolean,
  payload: iUserUpdate
): Promise<iUserWithoutPassDate> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User)

  if (userId != tokenId && !admin) {
    throw new AppError(`Insufficient permission`, 403)
  }

  const findUser: User | null = await userRepo.findOneBy({
    id: userId,
  })

  if (payload.email) {
    const validateEmail: User | null = await userRepo.findOne({
      where: {
        email: payload.email,
      },
    })

    if (validateEmail) throw new AppError('Email already exists', 409)
  }

  const data = userRepo.create({
    ...findUser,
    ...payload,
  })

  await userRepo.save(data)

  return returnUserSchemaDate.parse(data)
}

const remove = async (id: number): Promise<void> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User)

  const user = await userRepo.findOne({
    where: {
      id: id,
    },
  })

  await userRepo.softRemove(user!)
}

export default { create, read, update, remove }
