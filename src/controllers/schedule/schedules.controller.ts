import { Request, Response } from 'express'
import { schedulesService } from '../../services'

const create = async (req: Request, res: Response): Promise<Response> => {
  const data = await schedulesService.create(req.body, req.user.id)

  return res.status(201).json(data)
}

const read = async (req: Request, res: Response): Promise<Response> => {
  const realEstateId = Number(req.params.id)
  const data = await schedulesService.read(realEstateId)

  return res.status(200).json(data)
}

export default { create, read }
