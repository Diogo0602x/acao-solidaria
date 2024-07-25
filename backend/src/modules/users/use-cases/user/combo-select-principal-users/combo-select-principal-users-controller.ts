import { Request, Response } from 'express'
import { ComboSelectPrincipalUsersUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class ComboSelectPrincipalUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository()

    const comboSelectPrincipalUsersUseCase =
      new ComboSelectPrincipalUsersUseCase(userRepository)

    const principalUsers = await comboSelectPrincipalUsersUseCase.execute()

    return response.status(200).json(principalUsers)
  }
}

export { ComboSelectPrincipalUsersController }
