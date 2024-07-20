import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class DeletePrincipalUserUseCase {
  public async execute(id: string): Promise<void> {
    const principalUserRepository = new PrincipalUserRepository()
    await principalUserRepository.delete(id)
  }
}

export { DeletePrincipalUserUseCase }
