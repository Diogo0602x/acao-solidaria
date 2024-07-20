import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'
import { User } from '@modules/users/infra/mongoose/schemas/User'

class ListUserUseCase {
  public async execute(): Promise<User[]> {
    const userRepository = new UserRepository()
    const users = await userRepository.findAll()
    return users
  }
}

export { ListUserUseCase }
