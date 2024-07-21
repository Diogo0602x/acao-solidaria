import { Request, Response } from 'express'
import { ListUserByIdUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class ListUserByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const userRepository = new UserRepository()

    const listUserByIdUseCase = new ListUserByIdUseCase(userRepository)
    const user = await listUserByIdUseCase.execute(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.json(user)
  }
}

export { ListUserByIdController }
