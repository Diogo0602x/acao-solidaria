import { IUserRepository } from '@modules/users/repositories/IUserRepository'

class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}

export { DeleteUserUseCase }
