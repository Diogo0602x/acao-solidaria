import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'

class DeletePrincipalUserUseCase {
  constructor(private principalUserRepository: IPrincipalUserRepository) {}

  public async execute(id: string): Promise<void> {
    await this.principalUserRepository.delete(id)
  }
}

export { DeletePrincipalUserUseCase }
