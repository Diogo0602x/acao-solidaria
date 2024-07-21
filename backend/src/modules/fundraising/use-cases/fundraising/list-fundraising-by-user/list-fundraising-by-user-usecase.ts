import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'

class ListFundraisingByUserUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(userId: string): Promise<Fundraising[]> {
    return this.fundraisingRepository.findByUserId(userId)
  }
}

export { ListFundraisingByUserUseCase }
