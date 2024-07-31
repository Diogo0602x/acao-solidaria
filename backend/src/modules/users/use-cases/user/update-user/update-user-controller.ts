import { Request, Response } from 'express'
import { UpdateUserUseCase } from './update-user-usecase'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const data = request.body
    const userRepository = new UserRepository()

    const updateUserUseCase = new UpdateUserUseCase(userRepository)

    try {
      const user = await updateUserUseCase.execute(userId, data)
      return response.status(200).json(user)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { UpdateUserController }
