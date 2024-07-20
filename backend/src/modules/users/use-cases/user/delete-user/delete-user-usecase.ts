import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'

class DeleteUserUseCase {
  public async execute(id: string): Promise<void> {
    const userRepository = new UserRepository()
    await userRepository.delete(id)
  }
}

export { DeleteUserUseCase }
