import { ICreateFundraisingDTO } from '@modules/fundraising/dtos/ICreateFundraisingDTO'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'
import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'

class CreateFundraisingUseCase {
  constructor(
    private fundraisingRepository: IFundraisingRepository,
    private principalUserRepository: IPrincipalUserRepository,
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: ICreateFundraisingDTO): Promise<Fundraising> {
    const user = await this.userRepository.findById(data.userId)
    let pixKeyCpf: string | undefined
    let pixKeyCnpj: string | undefined
    let userId: string | undefined = data.userId

    if (user) {
      pixKeyCpf = user.cpf
      if (!user.linkedTo) {
        throw new Error('User linkedTo is not defined')
      }
      const principalUser = await this.principalUserRepository.findById(
        user.linkedTo.toString(),
      )
      if (principalUser) {
        pixKeyCnpj = principalUser.cnpj
      }
    } else {
      const principalUser = await this.principalUserRepository.findById(
        data.userId,
      )
      if (principalUser) {
        pixKeyCnpj = principalUser.cnpj
        userId = principalUser.id
      } else {
        throw new Error('User or PrincipalUser not found')
      }
    }

    const fundraising = await this.fundraisingRepository.create({
      ...data,
      pixKeyCpf,
      pixKeyCnpj,
      user: userId,
    })

    return fundraising
  }
}

export { CreateFundraisingUseCase }
