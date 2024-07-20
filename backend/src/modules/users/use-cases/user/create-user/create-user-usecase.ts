import { hash } from 'bcryptjs'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/infra/mongoose/schemas/User'

class CreateUserUseCase {
  public async execute(data: ICreateUserDTO): Promise<User> {
    const userRepository = new UserRepository()

    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    const hashedPassword = await hash(data.password, 8)

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    })

    return user
  }
}

export { CreateUserUseCase }
