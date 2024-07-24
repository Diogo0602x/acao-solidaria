import { Request, Response } from 'express'
import { ComboSelectPrincipalUsersUseCase } from '@users/use-cases'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class ComboSelectPrincipalUsersController {
  private comboSelectPrincipalUsersUseCase: ComboSelectPrincipalUsersUseCase

  constructor() {
    const principalUserRepository = new PrincipalUserRepository()
    this.comboSelectPrincipalUsersUseCase =
      new ComboSelectPrincipalUsersUseCase(principalUserRepository)
  }

  public handle = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    try {
      const comboSelectPrincipalUsers =
        await this.comboSelectPrincipalUsersUseCase.execute()
      return response.json(comboSelectPrincipalUsers)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { ComboSelectPrincipalUsersController }
