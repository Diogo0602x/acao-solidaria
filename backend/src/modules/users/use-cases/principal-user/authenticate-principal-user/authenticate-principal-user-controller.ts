import { Request, Response } from 'express'
import { AuthenticatePrincipalUserUseCase } from '@users/use-cases'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class AuthenticatePrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { identifier, password } = request.body
    const principalUserRepository = new PrincipalUserRepository()

    const authenticatePrincipalUserUseCase =
      new AuthenticatePrincipalUserUseCase(principalUserRepository)

    const { principalUser, token } =
      await authenticatePrincipalUserUseCase.execute({
        identifier,
        password,
      })

    return response.status(200).json({ principalUser, token })
  }
}

export { AuthenticatePrincipalUserController }
