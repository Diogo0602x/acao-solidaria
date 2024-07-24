import { IUpdateFundraisingDTO } from '@modules/fundraising/dtos/IUpdateFundraisingDTO'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'

class UpdateFundraisingUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(
    id: string,
    data: IUpdateFundraisingDTO,
  ): Promise<Fundraising | null> {
    let fundraising = await this.fundraisingRepository.findById(id)

    if (!fundraising) {
      throw new Error('Fundraising not found')
    }

    fundraising = await this.fundraisingRepository.update(id, data)

    return fundraising
  }
}

export { UpdateFundraisingUseCase }
