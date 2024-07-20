import { Request, Response } from 'express'
import { UpdateUserUseCase } from '@users/use-cases'

class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const updateData = request.body

    const updateUserUseCase = new UpdateUserUseCase()

    const user = await updateUserUseCase.execute(userId, updateData)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.json(user)
  }
}

export { UpdateUserController }
