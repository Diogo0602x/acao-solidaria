import { Request, Response } from 'express'
import { ListFundraisingByUserUseCase } from './list-fundraising-by-user-usecase'

class ListFundraisingByUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params
    const listFundraisingByUserUseCase = new ListFundraisingByUserUseCase()
    const fundraisings = await listFundraisingByUserUseCase.execute(userId)
    return res.json(fundraisings)
  }
}

export { ListFundraisingByUserController }
