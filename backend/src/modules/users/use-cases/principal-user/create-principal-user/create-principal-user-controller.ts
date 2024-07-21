import { Request, Response } from 'express'
import { CreatePrincipalUserUseCase } from '@users/use-cases'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class CreatePrincipalUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      cnpj,
      telephone,
      cellphone,
      address,
    } = request.body
    const principalUserRepository = new PrincipalUserRepository()

    const createPrincipalUserUseCase = new CreatePrincipalUserUseCase(
      principalUserRepository,
    )

    const principalUser = await createPrincipalUserUseCase.execute({
      name,
      email,
      password,
      confirmPassword,
      role,
      cnpj,
      telephone,
      cellphone,
      address,
    })

    return response.status(201).json(principalUser)
  }
}

export { CreatePrincipalUserController }
