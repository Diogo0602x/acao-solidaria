import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '@modules/users/infra/mongoose/schemas/User'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'

class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string, data: IUpdateUserDTO): Promise<User | null> {
    let user = await this.userRepository.findById(id)

    if (!user) {
      return null
    }

    user = Object.assign(user, data)
    await this.userRepository.update(id, data as Partial<ICreateUserDTO>)

    return user
  }
}

export { UpdateUserUseCase }
