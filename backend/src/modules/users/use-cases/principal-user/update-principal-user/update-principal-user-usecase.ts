import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'
import { IUpdatePrincipalUserDTO } from '@modules/users/dtos/IUpdatePrincipalUserDTO'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'

class UpdatePrincipalUserUseCase {
  public async execute(
    id: string,
    data: IUpdatePrincipalUserDTO,
  ): Promise<PrincipalUser | null> {
    const principalUserRepository = new PrincipalUserRepository()
    let principalUser = await principalUserRepository.findById(id)

    if (!principalUser) {
      return null
    }

    principalUser = Object.assign(principalUser, data)
    await principalUserRepository.update(id, principalUser)

    return principalUser
  }
}

export { UpdatePrincipalUserUseCase }
