import { Request, Response } from 'express'
import { GetAddressByCepUseCase } from '@users/use-cases'

class GetAddressByCepController {
  constructor(private getAddressByCepUseCase: GetAddressByCepUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { cep } = request.params

    try {
      const address = await this.getAddressByCepUseCase.execute(cep)
      return response.json(address)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { GetAddressByCepController }
