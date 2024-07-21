import { Request, Response } from 'express'
import { DeletePrincipalUserUseCase } from '@users/use-cases'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class DeletePrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { principalUserId } = request.params
    const principalUserRepository = new PrincipalUserRepository()

    const deletePrincipalUserUseCase = new DeletePrincipalUserUseCase(
      principalUserRepository,
    )
    await deletePrincipalUserUseCase.execute(principalUserId)

    return response
      .status(200)
      .json({ message: 'Principal user deleted successfully' })
  }
}

export { DeletePrincipalUserController }
