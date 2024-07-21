import { Request, Response } from 'express'
import { ListFundraisingByIdUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class ListFundraisingByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId } = request.params

    const fundraisingRepository = new FundraisingRepository()
    const listFundraisingByIdUseCase = new ListFundraisingByIdUseCase(
      fundraisingRepository,
    )
    const fundraising = await listFundraisingByIdUseCase.execute(fundraisingId)

    if (!fundraising) {
      return response.status(404).json({ error: 'Fundraising not found' })
    }

    return response.json(fundraising)
  }
}

export { ListFundraisingByIdController }
