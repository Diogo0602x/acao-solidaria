import { FundraisingPurchaseRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingPurchaseRepository'
import { Request, Response } from 'express'
import { ListFundraisingPurchasesByUserUseCase } from './list-fundraising-purchases-by-user-usecase'

class ListFundraisingPurchasesByUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const fundraisingPurchaseRepository = new FundraisingPurchaseRepository()

    const { userId } = req.params
    const listFundraisingPurchasesByUserUseCase =
      new ListFundraisingPurchasesByUserUseCase(fundraisingPurchaseRepository)
    const purchases =
      await listFundraisingPurchasesByUserUseCase.execute(userId)
    return res.json(purchases)
  }
}

export { ListFundraisingPurchasesByUserController }
