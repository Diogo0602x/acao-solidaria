import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'
import { IFundraisingPurchaseRepository } from '@modules/fundraising/repositories/IFundraisingPurchaseRepository'

interface ISalesResponse {
  fundraising: {
    id: string
    name: string
    imageUrl: string
    user: string
  }
  quantitySold: number
  priceSold: number
}

class ListFundraisingSalesByUserUseCase {
  constructor(
    private fundraisingRepository: IFundraisingRepository,
    private fundraisingPurchaseRepository: IFundraisingPurchaseRepository,
  ) {}

  public async execute(userId: string): Promise<ISalesResponse[]> {
    const fundraisings = await this.fundraisingRepository.findByUserId(userId)
    const sales: ISalesResponse[] = []

    for (const fundraising of fundraisings) {
      const purchases =
        await this.fundraisingPurchaseRepository.findByFundraisingId(
          fundraising.id,
        )
      let quantitySold = 0
      let priceSold = 0

      for (const purchase of purchases) {
        quantitySold += purchase.quantity
        priceSold += purchase.priceSold
      }

      sales.push({
        fundraising: {
          id: fundraising.id,
          name: fundraising.name,
          imageUrl: fundraising.imageUrl,
          user: userId,
        },
        quantitySold,
        priceSold,
      })
    }

    return sales
  }
}

export { ListFundraisingSalesByUserUseCase }
