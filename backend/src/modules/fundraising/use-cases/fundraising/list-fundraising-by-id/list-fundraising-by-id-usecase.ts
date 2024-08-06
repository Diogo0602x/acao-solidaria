import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'

class ListFundraisingByIdUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(fundraisingId: string): Promise<Fundraising | null> {
    const fundraising = await this.fundraisingRepository.findById(fundraisingId)
    if (!fundraising) {
      throw new Error('Fundraising not found')
    }
    return fundraising
  }
}

export { ListFundraisingByIdUseCase }
