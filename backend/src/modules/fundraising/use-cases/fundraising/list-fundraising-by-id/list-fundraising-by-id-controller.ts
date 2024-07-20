import { Request, Response } from 'express'
import { ListFundraisingByIdUseCase } from '@fundraising/use-cases'

class ListFundraisingByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId } = request.params

    const showFundraisingUseCase = new ListFundraisingByIdUseCase()
    const fundraising = await showFundraisingUseCase.execute(fundraisingId)

    if (!fundraising) {
      return response.status(404).json({ error: 'Fundraising not found' })
    }

    return response.json(fundraising)
  }
}

export { ListFundraisingByIdController }
