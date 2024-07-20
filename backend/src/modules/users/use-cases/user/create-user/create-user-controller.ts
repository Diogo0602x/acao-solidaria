import { Request, Response } from 'express'
import { CreateUserUseCase } from './create-user-usecase'

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      cpf,
      telephone,
      cellphone,
      address,
      linkedTo,
    } = request.body

    const createUserUseCase = new CreateUserUseCase()

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      confirmPassword,
      role,
      cpf,
      telephone,
      cellphone,
      address,
      linkedTo,
    })

    return response.status(201).json(user)
  }
}

export { CreateUserController }
