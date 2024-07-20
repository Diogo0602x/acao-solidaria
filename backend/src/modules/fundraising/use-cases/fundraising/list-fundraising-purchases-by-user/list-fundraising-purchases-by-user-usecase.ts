import { FundraisingPurchaseRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingPurchaseRepository'
import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'

class ListFundraisingPurchasesByUserUseCase {
  public async execute(userId: string): Promise<FundraisingPurchase[]> {
    const fundraisingPurchaseRepository = new FundraisingPurchaseRepository()
    return fundraisingPurchaseRepository.findByUserId(userId)
  }
}

export { ListFundraisingPurchasesByUserUseCase }
