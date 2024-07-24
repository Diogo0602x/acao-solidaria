import { Request, Response } from 'express'
import { PurchaseFundraisingUseCase } from '@fundraising/use-cases'
import { FundraisingPurchaseRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingPurchaseRepository'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class PurchaseFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId, userId, quantity } = request.body
    console.log(
      `Received purchase request with fundraisingId: ${fundraisingId}, userId: ${userId}, quantity: ${quantity}`,
    )

    const fundraisingPurchaseRepository = new FundraisingPurchaseRepository()
    const fundraisingRepository = new FundraisingRepository()
    const purchaseFundraisingUseCase = new PurchaseFundraisingUseCase(
      fundraisingPurchaseRepository,
      fundraisingRepository,
    )

    try {
      const purchase = await purchaseFundraisingUseCase.execute({
        fundraisingId,
        userId,
        quantity,
      })
      return response.status(201).json(purchase)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
}

export { PurchaseFundraisingController }
