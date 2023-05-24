import { Request, Response } from 'express'
import { realEstateService } from '../../services'

const create = async (req: Request, res: Response): Promise<Response> => {
  const data = await realEstateService.create(req.body)

  return res.status(201).json(data)
}

const read = async (req: Request, res: Response): Promise<Response> => {
  const data = await realEstateService.read()

  return res.status(200).json(data)
}

export default { create, read }