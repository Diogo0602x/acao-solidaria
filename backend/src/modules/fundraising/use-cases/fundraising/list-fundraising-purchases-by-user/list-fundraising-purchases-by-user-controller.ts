import { Request, Response } from 'express'
import { ListFundraisingPurchasesByUserUseCase } from '@fundraising/use-cases'

class ListFundraisingPurchasesByUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params
    const listFundraisingPurchasesByUserUseCase =
      new ListFundraisingPurchasesByUserUseCase()
    const purchases =
      await listFundraisingPurchasesByUserUseCase.execute(userId)
    return res.json(purchases)
  }
}

export { ListFundraisingPurchasesByUserController }
