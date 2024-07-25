import { Request, Response } from 'express'
import { ListFundraisingPurchasesByUserUseCase } from '@fundraising/use-cases'
import { FundraisingPurchaseRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingPurchaseRepository'

class ListFundraisingPurchasesByUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const fundraisingPurchaseRepository = new FundraisingPurchaseRepository()

    const listFundraisingPurchasesByUserUseCase =
      new ListFundraisingPurchasesByUserUseCase(fundraisingPurchaseRepository)

    const purchases =
      await listFundraisingPurchasesByUserUseCase.execute(userId)

    return response.status(200).json(purchases)
  }
}

export { ListFundraisingPurchasesByUserController }
