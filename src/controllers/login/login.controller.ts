import { Request, Response } from 'express'
import { loginService } from '../../services'

const create = async (req: Request, res: Response): Promise<Response> => {
  const token = await loginService.create(req.body)
  return res.status(200).json({
    token: token,
  })
}

export default { create }
