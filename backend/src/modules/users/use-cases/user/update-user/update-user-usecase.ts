import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { User } from '@modules/users/infra/mongoose/schemas/User'

class UpdateUserUseCase {
  public async execute(id: string, data: IUpdateUserDTO): Promise<User | null> {
    const userRepository = new UserRepository()
    let user = await userRepository.findById(id)

    if (!user) {
      return null
    }

    user = Object.assign(user, data)
    await userRepository.update(id, data)

    return user
  }
}

export { UpdateUserUseCase }
