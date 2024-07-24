import { Request, Response } from 'express'
import { UpdateFundraisingUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class UpdateFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId } = request.params
    const { name, quantity, quantityAvailable, price, imageUrl } = request.body

    const fundraisingRepository = new FundraisingRepository()
    const updateFundraisingUseCase = new UpdateFundraisingUseCase(
      fundraisingRepository,
    )

    const fundraising = await updateFundraisingUseCase.execute(fundraisingId, {
      name,
      quantity,
      quantityAvailable,
      price,
      imageUrl,
    })

    return response.status(200).json(fundraising)
  }
}

export { UpdateFundraisingController }
