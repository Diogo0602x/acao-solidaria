import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'
import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'

class ListPrincipalUserUseCase {
  constructor(private principalUserRepository: IPrincipalUserRepository) {}

  public async execute(): Promise<PrincipalUser[]> {
    const principalUsers = await this.principalUserRepository.findAll()
    return principalUsers
  }
}

export { ListPrincipalUserUseCase }
