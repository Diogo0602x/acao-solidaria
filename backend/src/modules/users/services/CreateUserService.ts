import { hash } from 'bcryptjs'
import { User } from '@modules/users/infra/mongoose/schemas/User'
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO'

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    role,
    cnpj,
    cpf,
    address,
    linkedTo,
  }: CreateUserDTO): Promise<User> {
    const hashedPassword = await hash(password, 8)

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      cnpj,
      cpf,
      address,
      linkedTo,
    })

    await user.save()

    return user
  }
}

export { CreateUserService }
