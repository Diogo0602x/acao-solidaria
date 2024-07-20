import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'
import { User } from '@modules/users/infra/mongoose/schemas/User'

class ListUserByIdUseCase {
  public async execute(id: string): Promise<User | undefined> {
    const userRepository = new UserRepository()
    const user = await userRepository.findById(id)
    return user
  }
}

export { ListUserByIdUseCase }
