import { Request, Response } from 'express'
import { ListByIdPrincipalUserUseCase } from '@users/use-cases'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class ListByIdPrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { principalUserId } = request.params
    const principalUserRepository = new PrincipalUserRepository()

    const showPrincipalUserUseCase = new ListByIdPrincipalUserUseCase(
      principalUserRepository,
    )
    const principalUser =
      await showPrincipalUserUseCase.execute(principalUserId)

    if (!principalUser) {
      return response.status(404).json({ error: 'Principal user not found' })
    }

    return response.json(principalUser)
  }
}

export { ListByIdPrincipalUserController }
