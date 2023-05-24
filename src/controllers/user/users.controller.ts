import { Request, Response } from 'express'
import { iUserReadAll, iUserWithoutPassDate, iUserWithoutPassString } from '../../interfaces'
import { usersService } from '../../services'

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: iUserWithoutPassDate = await usersService.create(req.body)

  return res.status(201).json(data)
}

const read = async (req: Request, res: Response): Promise<Response> => {
  const allUsers: iUserReadAll = await usersService.read()

  return res.status(200).json(allUsers)
}

const update = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.params.id)
  const { id, admin } = req.user

  const data: iUserWithoutPassDate = await usersService.update(
    userId,
    id,
    admin,
    req.body
  )

  return res.status(200).json(data)
}

const remove = async (req: Request, res: Response): Promise<Response> => {
  await usersService.remove(Number(req.params.id))

  return res.status(204).send()
}

export default { create, read, update, remove }
