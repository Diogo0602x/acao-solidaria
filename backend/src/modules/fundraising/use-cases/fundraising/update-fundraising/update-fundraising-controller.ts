import { Request, Response } from 'express'
import { UpdateFundraisingUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class UpdateFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId } = request.params
    const updateData = request.body
    const fundraisingRepository = new FundraisingRepository()
    const updateFundraisingUseCase = new UpdateFundraisingUseCase(
      fundraisingRepository,
    )

    const fundraising = await updateFundraisingUseCase.execute(
      fundraisingId,
      updateData,
    )

    if (!fundraising) {
      return response.status(404).json({ error: 'Fundraising not found' })
    }

    return response.json(fundraising)
  }
}

export { UpdateFundraisingController }
