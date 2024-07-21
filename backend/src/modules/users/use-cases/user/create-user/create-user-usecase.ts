import { hash } from 'bcryptjs'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '@modules/users/infra/mongoose/schemas/User'

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  public async execute(data: ICreateUserDTO): Promise<User> {
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    const hashedPassword = await hash(data.password, 8)

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    })

    return user
  }
}

export { CreateUserUseCase }
