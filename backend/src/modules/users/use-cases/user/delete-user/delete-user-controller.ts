import { Request, Response } from 'express'
import { DeleteUserUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const userRepository = new UserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(userRepository)
    await deleteUserUseCase.execute(userId)

    return response.status(200).json({ message: 'User deleted successfully' })
  }
}

export { DeleteUserController }
