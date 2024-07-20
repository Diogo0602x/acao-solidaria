import { Request, Response } from 'express'
import { AuthenticatePrincipalUserUseCase } from './authenticate-principal-user-usecase'

class AuthenticatePrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { identifier, password } = request.body

    const authenticatePrincipalUserUseCase =
      new AuthenticatePrincipalUserUseCase()

    const { principalUser, token } =
      await authenticatePrincipalUserUseCase.execute({
        identifier,
        password,
      })

    return response.status(200).json({ principalUser, token })
  }
}

export { AuthenticatePrincipalUserController }
