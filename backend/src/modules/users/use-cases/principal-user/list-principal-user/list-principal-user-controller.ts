import { Request, Response } from 'express'
import { ListPrincipalUserUseCase } from '@users/use-cases'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class ListPrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const principalUserRepository = new PrincipalUserRepository()

    const listPrincipalUserUseCase = new ListPrincipalUserUseCase(
      principalUserRepository,
    )
    const principalUsers = await listPrincipalUserUseCase.execute()
    return response.json(principalUsers)
  }
}

export { ListPrincipalUserController }
