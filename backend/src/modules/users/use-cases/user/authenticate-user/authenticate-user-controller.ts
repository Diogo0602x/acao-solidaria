import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { identifier, password } = request.body
    const userRepository = new UserRepository()

    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

    try {
      const { user, token } = await authenticateUserUseCase.execute({
        identifier,
        password,
      })

      return response.status(200).json({ user, token })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { AuthenticateUserController }
