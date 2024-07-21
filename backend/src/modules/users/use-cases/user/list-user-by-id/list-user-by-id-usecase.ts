import { User } from '@modules/users/infra/mongoose/schemas/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

class ListUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id)
    return user
  }
}

export { ListUserByIdUseCase }