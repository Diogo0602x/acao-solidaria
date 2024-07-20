import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'

class ListPrincipalUserUseCase {
  public async execute(): Promise<PrincipalUser[]> {
    const principalUserRepository = new PrincipalUserRepository()
    const principalUsers = await principalUserRepository.findAll()
    return principalUsers
  }
}

export { ListPrincipalUserUseCase }
