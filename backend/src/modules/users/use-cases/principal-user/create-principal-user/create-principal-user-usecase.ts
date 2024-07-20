import { hash } from 'bcryptjs'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'
import { ICreatePrincipalUserDTO } from '@modules/users/dtos/ICreatePrincipalUserDTO'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'

class CreatePrincipalUserUseCase {
  public async execute(data: ICreatePrincipalUserDTO): Promise<PrincipalUser> {
    const principalUserRepository = new PrincipalUserRepository()

    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    const hashedPassword = await hash(data.password, 8)

    const principalUser = await principalUserRepository.create({
      ...data,
      password: hashedPassword,
    })

    return principalUser
  }
}

export { CreatePrincipalUserUseCase }
