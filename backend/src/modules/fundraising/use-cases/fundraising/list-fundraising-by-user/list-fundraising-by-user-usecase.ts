import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'

class ListFundraisingByUserUseCase {
  public async execute(userId: string): Promise<Fundraising[]> {
    const fundraisingRepository = new FundraisingRepository()
    return fundraisingRepository.findByUserId(userId)
  }
}

export { ListFundraisingByUserUseCase }
