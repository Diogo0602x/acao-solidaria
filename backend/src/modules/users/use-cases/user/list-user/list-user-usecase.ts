import { User } from '@modules/users/infra/mongoose/schemas/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

class ListUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll()
    return users
  }
}

export { ListUserUseCase }
