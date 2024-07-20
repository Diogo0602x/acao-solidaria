import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
import { IUpdateFundraisingDTO } from '@modules/fundraising/dtos/IUpdateFundraisingDTO'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'

class UpdateFundraisingUseCase {
  public async execute(
    id: string,
    data: IUpdateFundraisingDTO,
  ): Promise<Fundraising | undefined> {
    const fundraisingRepository = new FundraisingRepository()
    let fundraising = await fundraisingRepository.findById(id)

    if (!fundraising) {
      return undefined
    }

    fundraising = await fundraisingRepository.update(id, data)

    return fundraising
  }
}

export { UpdateFundraisingUseCase }
