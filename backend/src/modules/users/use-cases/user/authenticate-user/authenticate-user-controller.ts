import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './authenticate-user-usecase'

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { identifier, password } = request.body

    const authenticateUserUseCase = new AuthenticateUserUseCase()

    const { user, token } = await authenticateUserUseCase.execute({
      identifier,
      password,
    })

    return response.status(200).json({ user, token })
  }
}

export { AuthenticateUserController }
