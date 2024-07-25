import { Request, Response } from 'express'
import { CreateFundraisingUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class CreateFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, quantity, quantityAvailable, price, imageUrl, userId } =
      request.body

    const fundraisingRepository = new FundraisingRepository()
    const userRepository = new UserRepository()

    const createFundraisingUseCase = new CreateFundraisingUseCase(
      fundraisingRepository,
      userRepository,
    )

    const fundraising = await createFundraisingUseCase.execute({
      name,
      quantity,
      quantityAvailable,
      price,
      imageUrl,
      userId,
    })

    return response.status(201).json(fundraising)
  }
}

export { CreateFundraisingController }
