import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'

class ListFundraisingByIdUseCase {
  public async execute(id: string): Promise<Fundraising | undefined> {
    const fundraisingRepository = new FundraisingRepository()
    const fundraising = await fundraisingRepository.findById(id)
    return fundraising
  }
}

export { ListFundraisingByIdUseCase }
