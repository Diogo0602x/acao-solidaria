import { Request, Response } from 'express'
import { CreateFundraisingUseCase } from '@fundraising/use-cases'

class CreateFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, quantityAvailable, imageUrl, userId } = request.body

    const createFundraisingUseCase = new CreateFundraisingUseCase()

    const fundraising = await createFundraisingUseCase.execute({
      name,
      quantityAvailable,
      imageUrl,
      userId,
    })

    return response.status(201).json(fundraising)
  }
}

export { CreateFundraisingController }
