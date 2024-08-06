import { Request, Response } from 'express'
import { CreateUserUseCase } from './create-user-usecase'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const userRepository = new UserRepository()

    const createUserUseCase = new CreateUserUseCase(userRepository)

    try {
      const user = await createUserUseCase.execute(data)
      return response.status(201).json(user)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { CreateUserController }
