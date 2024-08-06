import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { IUpdateFundraisingDTO } from '@modules/fundraising/dtos/IUpdateFundraisingDTO'

class UpdateFundraisingUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(
    fundraisingId: string,
    data: IUpdateFundraisingDTO,
  ): Promise<Fundraising | null> {
    const fundraising = await this.fundraisingRepository.update(
      fundraisingId,
      data,
    )
    if (!fundraising) {
      throw new Error('Fundraising not found')
    }
    return fundraising
  }
}

export { UpdateFundraisingUseCase }
