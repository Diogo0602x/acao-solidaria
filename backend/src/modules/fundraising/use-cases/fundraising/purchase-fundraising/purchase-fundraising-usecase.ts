import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'
import { IFundraisingPurchaseRepository } from '@modules/fundraising/repositories/IFundraisingPurchaseRepository'
import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'

interface IRequest {
  fundraisingId: string
  userId: string
  quantity: number
}

class PurchaseFundraisingUseCase {
  constructor(
    private fundraisingRepository: IFundraisingRepository,
    private fundraisingPurchaseRepository: IFundraisingPurchaseRepository,
  ) {}

  public async execute(data: IRequest): Promise<FundraisingPurchase> {
    const fundraising = await this.fundraisingRepository.findById(
      data.fundraisingId,
    )
    if (!fundraising) {
      throw new Error('Fundraising not found')
    }

    if (fundraising.quantityAvailable < data.quantity) {
      throw new Error('Not enough quantity available')
    }

    fundraising.quantityAvailable -= data.quantity
    fundraising.quantitySold += data.quantity

    await this.fundraisingRepository.update(fundraising._id as string, {
      quantityAvailable: fundraising.quantityAvailable,
      quantitySold: fundraising.quantitySold,
    })

    const pricePurchased = fundraising.price
    const priceSold = fundraising.price

    const fundraisingPurchase = await this.fundraisingPurchaseRepository.create(
      {
        fundraising: data.fundraisingId,
        user: data.userId,
        quantity: data.quantity,
        pricePurchased,
        priceSold,
      },
    )
    return fundraisingPurchase
  }
}

export { PurchaseFundraisingUseCase }
