import { Request, Response } from 'express'
import { PurchaseFundraisingUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
import { FundraisingPurchaseRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingPurchaseRepository'

class PurchaseFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId, userId, quantity } = request.body
    const fundraisingRepository = new FundraisingRepository()
    const fundraisingPurchaseRepository = new FundraisingPurchaseRepository()

    const purchaseFundraisingUseCase = new PurchaseFundraisingUseCase(
      fundraisingRepository,
      fundraisingPurchaseRepository,
    )

    const fundraisingPurchase = await purchaseFundraisingUseCase.execute({
      fundraisingId,
      userId,
      quantity,
    })

    return response.status(201).json(fundraisingPurchase)
  }
}

export { PurchaseFundraisingController }
