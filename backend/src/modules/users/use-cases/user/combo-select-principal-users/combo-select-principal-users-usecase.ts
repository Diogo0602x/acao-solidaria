import { IUserRepository } from '@modules/users/repositories/IUserRepository'

interface IPrincipalUser {
  label: string
  value: string
}

class ComboSelectPrincipalUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(): Promise<IPrincipalUser[]> {
    const principalUsers = await this.userRepository.findAll()
    return principalUsers
      .filter((user) => user.role === 'church' || user.role === 'seminary')
      .map((user) => ({
        label: user.name,
        value: user.id,
      }))
  }
}

export { ComboSelectPrincipalUsersUseCase }
