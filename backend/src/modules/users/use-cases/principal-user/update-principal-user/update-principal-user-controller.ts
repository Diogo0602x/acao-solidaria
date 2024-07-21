import { Request, Response } from 'express'
import { UpdatePrincipalUserUseCase } from '@users/use-cases'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class UpdatePrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { principalUserId } = request.params
    const updateData = request.body
    const principalUserRepository = new PrincipalUserRepository()

    const updatePrincipalUserUseCase = new UpdatePrincipalUserUseCase(
      principalUserRepository,
    )

    const principalUser = await updatePrincipalUserUseCase.execute(
      principalUserId,
      updateData,
    )

    if (!principalUser) {
      return response.status(404).json({ error: 'Principal user not found' })
    }

    return response.json(principalUser)
  }
}

export { UpdatePrincipalUserController }
