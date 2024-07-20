import { Request, Response } from 'express'
import { CreatePrincipalUserUseCase } from './create-principal-user-usecase'

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

    const createPrincipalUserUseCase = new CreatePrincipalUserUseCase()

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
