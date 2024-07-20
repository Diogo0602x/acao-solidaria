import { Request, Response } from 'express'
import { CreateUserService } from '@modules/users/services/CreateUserService'
import { UpdateUserService } from '@modules/users/services/UpdateUserService'
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { User } from '@modules/users/infra/mongoose/schemas/User'

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role, cnpj, cpf, address, linkedTo } =
      request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
      role,
      cnpj,
      cpf,
      address,
      linkedTo,
    })

    return response.status(201).json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const updateData = request.body

    const updateUser = new UpdateUserService()

    const user = await updateUser.execute(userId, updateData)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.json(user)
  }

  public async authenticate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({ email, password })

    return response.json({ user, token })
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const users = await User.find()

    return response.json(users)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params

    const user = await User.findById(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.json(user)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params

    const user = await User.findById(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    await User.findByIdAndDelete(userId)

    return response.status(200).json({ message: 'User deleted successfully' })
  }
}

export { UsersController }
