import { Request, Response } from 'express'
import { ListFundraisingSalesByUserUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class ListFundraisingSalesByUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const fundraisingRepository = new FundraisingRepository()

    const listFundraisingSalesByUserUseCase =
      new ListFundraisingSalesByUserUseCase(fundraisingRepository)

    const sales = await listFundraisingSalesByUserUseCase.execute(userId)

    return response.status(200).json(sales)
  }
}

export { ListFundraisingSalesByUserController }
