import { Request, Response } from 'express'
import { iCategoryCreate, iCategoryRead } from '../../interfaces'
import { categoriesService } from '../../services'

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: iCategoryCreate = await categoriesService.create(req.body)

  return res.status(201).json(data)
}

const read = async (req: Request, res: Response): Promise<Response> => {
  const allCategories: iCategoryRead = await categoriesService.read()

  return res.status(200).json(allCategories)
}

const readProperties = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id)
  const data = await categoriesService.readProperties(id)

  return res.status(200).json(data)
}

export default { create, read, readProperties }
