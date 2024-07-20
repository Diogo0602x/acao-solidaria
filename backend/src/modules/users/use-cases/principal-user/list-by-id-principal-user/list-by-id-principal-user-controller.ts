import { Request, Response } from 'express'
import { ListByIdPrincipalUserUseCase } from '@users/use-cases'

class ListByIdPrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { principalUserId } = request.params

    const showPrincipalUserUseCase = new ListByIdPrincipalUserUseCase()
    const principalUser =
      await showPrincipalUserUseCase.execute(principalUserId)

    if (!principalUser) {
      return response.status(404).json({ error: 'Principal user not found' })
    }

    return response.json(principalUser)
  }
}

export { ListByIdPrincipalUserController }
