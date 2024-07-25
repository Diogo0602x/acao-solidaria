import { hash } from 'bcryptjs'
import { User } from '@modules/users/infra/mongoose/schemas/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    const { password, confirmPassword, cpf, cnpj, linkedTo, role } = data

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    if (role === 'church' || role === 'seminary') {
      if (!cnpj) {
        throw new Error('CNPJ is required for principal users')
      }
    } else {
      if (!linkedTo) {
        throw new Error('LinkedTo is required for regular users')
      }
      if (!cpf) {
        throw new Error('CPF is required for regular users')
      }
    }

    const hashedPassword = await hash(password, 8)
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    })

    return user
  }
}

export { CreateUserUseCase }
