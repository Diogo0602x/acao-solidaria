import { ICreateFundraisingDTO } from '@modules/fundraising/dtos/ICreateFundraisingDTO'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'

class CreateFundraisingUseCase {
  constructor(
    private fundraisingRepository: IFundraisingRepository,
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: ICreateFundraisingDTO): Promise<Fundraising> {
    const user = await this.userRepository.findById(data.userId)

    if (!user) {
      throw new Error('User not found')
    }

    const pixKeyCpf = user.cpf
    const pixKeyCnpj = user.cnpj
    const userId = user.id

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
