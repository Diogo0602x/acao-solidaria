import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'

interface IComboSelectPrincipalUser {
  label: string
  value: string
}

class ComboSelectPrincipalUsersUseCase {
  constructor(private principalUserRepository: IPrincipalUserRepository) {}

  public async execute(): Promise<IComboSelectPrincipalUser[]> {
    const principalUsers = await this.principalUserRepository.findAll()
    return principalUsers.map((principalUser) => ({
      label: principalUser.name,
      value: principalUser.id,
    }))
  }
}

export { ComboSelectPrincipalUsersUseCase }
