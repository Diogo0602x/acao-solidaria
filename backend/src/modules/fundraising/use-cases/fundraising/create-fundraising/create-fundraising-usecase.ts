import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
import { ICreateFundraisingDTO } from '@modules/fundraising/dtos/ICreateFundraisingDTO'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'

class CreateFundraisingUseCase {
  public async execute(data: ICreateFundraisingDTO): Promise<Fundraising> {
    const fundraisingRepository = new FundraisingRepository()
    const userRepository = new UserRepository()
    const principalUserRepository = new PrincipalUserRepository()

    const user = await userRepository.findById(data.userId)
    let pixKeyCpf: string | undefined
    let pixKeyCnpj: string | undefined
    let userId: string | undefined = data.userId

    if (user) {
      pixKeyCpf = user.cpf
      const principalUser = await principalUserRepository.findById(
        user.linkedTo.toString(),
      )
      if (principalUser) {
        pixKeyCnpj = principalUser.cnpj
      }
    } else {
      const principalUser = await principalUserRepository.findById(data.userId)
      if (principalUser) {
        pixKeyCnpj = principalUser.cnpj
        userId = principalUser.id
      } else {
        throw new Error('User or PrincipalUser not found')
      }
    }

    const fundraising = await fundraisingRepository.create({
      ...data,
      pixKeyCpf,
      pixKeyCnpj,
      user: userId,
    })

    return fundraising
  }
}

export { CreateFundraisingUseCase }
