import { IFundraisingPurchaseRepository } from '@modules/fundraising/repositories/IFundraisingPurchaseRepository'
import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'

class ListFundraisingPurchasesByUserUseCase {
  constructor(
    private fundraisingPurchaseRepository: IFundraisingPurchaseRepository,
  ) {}

  public async execute(userId: string): Promise<FundraisingPurchase[]> {
    const purchases =
      await this.fundraisingPurchaseRepository.findByUserId(userId)
    return purchases
  }
}

export { ListFundraisingPurchasesByUserUseCase }
