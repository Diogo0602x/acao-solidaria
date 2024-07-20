import { Request, Response } from 'express'
import { ListPrincipalUserUseCase } from '@users/use-cases'

class ListPrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listPrincipalUserUseCase = new ListPrincipalUserUseCase()
    const principalUsers = await listPrincipalUserUseCase.execute()
    return response.json(principalUsers)
  }
}

export { ListPrincipalUserController }
