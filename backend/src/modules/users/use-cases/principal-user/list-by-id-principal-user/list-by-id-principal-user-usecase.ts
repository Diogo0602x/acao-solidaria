import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'

class ListByIdPrincipalUserUseCase {
  public async execute(id: string): Promise<PrincipalUser | null> {
    const principalUserRepository = new PrincipalUserRepository()
    const principalUser = await principalUserRepository.findById(id)
    return principalUser
  }
}

export { ListByIdPrincipalUserUseCase }
