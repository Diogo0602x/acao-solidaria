import { Request, Response } from 'express'
import { ListFundraisingByUserUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class ListFundraisingByUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params

    const fundraisingRepository = new FundraisingRepository()
    const listFundraisingByUserUseCase = new ListFundraisingByUserUseCase(
      fundraisingRepository,
    )
    const fundraisings = await listFundraisingByUserUseCase.execute(userId)
    return res.json(fundraisings)
  }
}

export { ListFundraisingByUserController }
