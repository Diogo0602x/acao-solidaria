import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'
import { IFundraisingPurchaseRepository } from '@modules/fundraising/repositories/IFundraisingPurchaseRepository'

class ListFundraisingPurchasesByUserUseCase {
  constructor(
    private fundraisingPurchaseRepository: IFundraisingPurchaseRepository,
  ) {}

  public async execute(userId: string): Promise<FundraisingPurchase[]> {
    return this.fundraisingPurchaseRepository.findByUserId(userId)
  }
}

export { ListFundraisingPurchasesByUserUseCase }
