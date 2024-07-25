import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { identifier, password } = request.body
    const userRepository = new UserRepository()

    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

    const { user, token } = await authenticateUserUseCase.execute({
      identifier,
      password,
    })

    return response.status(200).json({ user, token })
  }
}

export { AuthenticateUserController }
