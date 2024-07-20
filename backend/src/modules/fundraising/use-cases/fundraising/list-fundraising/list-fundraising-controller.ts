import { Request, Response } from 'express'
import { ListFundraisingUseCase } from '@fundraising/use-cases'

class ListFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listFundraisingUseCase = new ListFundraisingUseCase()
    const fundraisings = await listFundraisingUseCase.execute()
    return response.json(fundraisings)
  }
}

export { ListFundraisingController }
