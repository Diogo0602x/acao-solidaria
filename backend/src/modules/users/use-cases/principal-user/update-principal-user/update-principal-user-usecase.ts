import { IUpdatePrincipalUserDTO } from '@modules/users/dtos/IUpdatePrincipalUserDTO'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'
import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'

class UpdatePrincipalUserUseCase {
  constructor(private principalUserRepository: IPrincipalUserRepository) {}

  public async execute(
    id: string,
    data: IUpdatePrincipalUserDTO,
  ): Promise<PrincipalUser | null> {
    let principalUser = await this.principalUserRepository.findById(id)

    if (!principalUser) {
      return null
    }

    principalUser = Object.assign(principalUser, data)
    await this.principalUserRepository.update(id, principalUser)

    return principalUser
  }
}

export { UpdatePrincipalUserUseCase }
