import { Request, Response } from 'express'
import { ListFundraisingUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class ListFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const fundraisingRepository = new FundraisingRepository()
    const listFundraisingUseCase = new ListFundraisingUseCase(
      fundraisingRepository,
    )
    const fundraisings = await listFundraisingUseCase.execute()
    return response.json(fundraisings)
  }
}

export { ListFundraisingController }
