import { Request, Response } from 'express'
import { ListUserByIdUseCase } from '@users/use-cases'

class ListUserByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params

    const listUserByIdUseCase = new ListUserByIdUseCase()
    const user = await listUserByIdUseCase.execute(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.json(user)
  }
}

export { ListUserByIdController }
