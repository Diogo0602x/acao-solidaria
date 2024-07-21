import { Request, Response } from 'express'
import { CreateFundraisingUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class CreateFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, quantityAvailable, imageUrl, userId } = request.body

    const fundraisingRepository = new FundraisingRepository()
    const principalUserRepository = new PrincipalUserRepository()
    const userRepository = new UserRepository()
    const createFundraisingUseCase = new CreateFundraisingUseCase(
      fundraisingRepository,
      principalUserRepository,
      userRepository,
    )

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
