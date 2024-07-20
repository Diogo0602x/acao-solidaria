import { Request, Response } from 'express'
import { UpdateFundraisingUseCase } from '@fundraising/use-cases'

class UpdateFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId } = request.params
    const updateData = request.body

    const updateFundraisingUseCase = new UpdateFundraisingUseCase()

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
