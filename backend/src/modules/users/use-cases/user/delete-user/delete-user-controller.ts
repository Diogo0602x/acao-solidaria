import { Request, Response } from 'express'
import { DeleteUserUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const userRepository = new UserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(userRepository)

    await deleteUserUseCase.execute(id)

    return response.status(204).send()
  }
}

export { DeleteUserController }
