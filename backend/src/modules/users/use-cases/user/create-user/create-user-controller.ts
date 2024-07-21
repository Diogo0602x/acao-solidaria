import { Request, Response } from 'express'
import { CreateUserUseCase } from '@users/use-cases'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

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
    const userRepository = new UserRepository()

    const createUserUseCase = new CreateUserUseCase(userRepository)

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
