import { hash } from 'bcryptjs'
import { User } from '@modules/users/infra/mongoose/schemas/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'

class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(
    userId: string,
    data: IUpdateUserDTO,
  ): Promise<User | null> {
    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      throw new Error('Passwords do not match')
    }

    if (data.password) {
      const hashedPassword = await hash(data.password, 8)
      data.password = hashedPassword
    }

    return this.userRepository.update(userId, data)
  }
}

export { UpdateUserUseCase }
