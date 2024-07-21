import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'
import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'

class ListByIdPrincipalUserUseCase {
  constructor(private principalUserRepository: IPrincipalUserRepository) {}

  public async execute(id: string): Promise<PrincipalUser | null> {
    const principalUser = await this.principalUserRepository.findById(id)
    return principalUser
  }
}

export { ListByIdPrincipalUserUseCase }
