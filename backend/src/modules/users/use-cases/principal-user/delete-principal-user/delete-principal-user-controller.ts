import { Request, Response } from 'express'
import { DeletePrincipalUserUseCase } from '@users/use-cases'

class DeletePrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { principalUserId } = request.params

    const deletePrincipalUserUseCase = new DeletePrincipalUserUseCase()
    await deletePrincipalUserUseCase.execute(principalUserId)

    return response
      .status(200)
      .json({ message: 'Principal user deleted successfully' })
  }
}

export { DeletePrincipalUserController }
