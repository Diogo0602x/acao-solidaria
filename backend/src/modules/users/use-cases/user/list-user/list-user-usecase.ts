import { User } from '@modules/users/infra/mongoose/schemas/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

class ListUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}

export { ListUserUseCase }
