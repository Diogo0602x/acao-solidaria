import { Request, Response } from 'express'
import { ListUserUseCase } from '@users/use-cases'

class ListUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUserUseCase = new ListUserUseCase()
    const users = await listUserUseCase.execute()
    return response.json(users)
  }
}

export { ListUserController }
