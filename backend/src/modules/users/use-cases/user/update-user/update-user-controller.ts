import { Request, Response } from 'express'
import { UpdateUserUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const updateData = request.body
    const userRepository = new UserRepository()

    const updateUserUseCase = new UpdateUserUseCase(userRepository)

    const user = await updateUserUseCase.execute(userId, updateData)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.json(user)
  }
}

export { UpdateUserController }
