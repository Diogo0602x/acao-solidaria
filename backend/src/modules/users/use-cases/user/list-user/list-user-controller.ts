import { Request, Response } from 'express'
import { ListUserUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class ListUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository()
    const listUserUseCase = new ListUserUseCase(userRepository)

    const users = await listUserUseCase.execute()

    return response.status(200).json(users)
  }
}

export { ListUserController }
