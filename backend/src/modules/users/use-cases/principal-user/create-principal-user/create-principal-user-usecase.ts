import { hash } from 'bcryptjs'
import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'
import { ICreatePrincipalUserDTO } from '@modules/users/dtos/ICreatePrincipalUserDTO'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'

class CreatePrincipalUserUseCase {
  constructor(private principalUserRepository: IPrincipalUserRepository) {}
  public async execute(data: ICreatePrincipalUserDTO): Promise<PrincipalUser> {
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    const hashedPassword = await hash(data.password, 8)

    const principalUser = await this.principalUserRepository.create({
      ...data,
      password: hashedPassword,
    })

    return principalUser
  }
}

export { CreatePrincipalUserUseCase }
