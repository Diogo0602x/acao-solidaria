import { Request, Response } from 'express'
import { UpdatePrincipalUserUseCase } from '@users/use-cases'

class UpdatePrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { principalUserId } = request.params
    const updateData = request.body

    const updatePrincipalUserUseCase = new UpdatePrincipalUserUseCase()

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
