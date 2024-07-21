import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'

class ListFundraisingByIdUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(id: string): Promise<Fundraising | null> {
    const fundraising = await this.fundraisingRepository.findById(id)
    return fundraising
  }
}

export { ListFundraisingByIdUseCase }
