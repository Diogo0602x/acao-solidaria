import { IFundraisingPurchaseRepository } from '@modules/fundraising/repositories/IFundraisingPurchaseRepository'
import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'

class ListFundraisingPurchasesByUserUseCase {
  constructor(
    private fundraisingPurchaseRepository: IFundraisingPurchaseRepository,
  ) {}

  public async execute(userId: string): Promise<FundraisingPurchase[]> {
    const purchases =
      await this.fundraisingPurchaseRepository.findByUserId(userId)

    const groupedPurchases = purchases.reduce(
      (acc: FundraisingPurchase[], purchase: FundraisingPurchase) => {
        const existing = acc.find(
          (item) =>
            item.fundraising.toString() === purchase.fundraising.toString(),
        )
        if (existing) {
          existing.quantity += purchase.quantity
        } else {
          acc.push(purchase)
        }
        return acc
      },
      [],
    )

    return groupedPurchases
  }
}

export { ListFundraisingPurchasesByUserUseCase }
