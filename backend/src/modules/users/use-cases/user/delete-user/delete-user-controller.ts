import { Request, Response } from 'express'
import { DeleteUserUseCase } from '@users/use-cases'

class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params

    const deleteUserUseCase = new DeleteUserUseCase()
    await deleteUserUseCase.execute(userId)

    return response.status(200).json({ message: 'User deleted successfully' })
  }
}

export { DeleteUserController }
