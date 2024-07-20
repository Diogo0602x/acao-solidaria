import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'

class ListFundraisingUseCase {
  public async execute(): Promise<Fundraising[]> {
    const fundraisingRepository = new FundraisingRepository()
    const fundraisings = await fundraisingRepository.findAll()
    return fundraisings
  }
}

export { ListFundraisingUseCase }
