import { Request, Response } from 'express'
import { AuthenticateTokenUseCase } from '@efi/use-cases'

class AuthenticateTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const authenticateTokenUseCase = new AuthenticateTokenUseCase()

    try {
      const accessToken = await authenticateTokenUseCase.execute()

      return response.status(200).json({ access_token: accessToken })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { AuthenticateTokenController }
