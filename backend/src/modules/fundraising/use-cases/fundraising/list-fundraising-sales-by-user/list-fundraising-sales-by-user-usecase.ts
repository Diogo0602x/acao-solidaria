import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'

class ListFundraisingSalesByUserUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(userId: string): Promise<Fundraising[]> {
    const sales = await this.fundraisingRepository.findByUserId(userId)
    return sales
  }
}

export { ListFundraisingSalesByUserUseCase }
