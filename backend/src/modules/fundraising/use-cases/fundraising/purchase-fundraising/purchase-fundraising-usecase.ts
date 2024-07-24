import { IFundraisingPurchaseRepository } from '@modules/fundraising/repositories/IFundraisingPurchaseRepository'
import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'
import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'

interface IRequest {
  fundraisingId: string
  userId: string
  quantity: number
}

class PurchaseFundraisingUseCase {
  constructor(
    private fundraisingPurchaseRepository: IFundraisingPurchaseRepository,
    private fundraisingRepository: IFundraisingRepository,
  ) {}

  public async execute({
    fundraisingId,
    userId,
    quantity,
  }: IRequest): Promise<FundraisingPurchase> {
    console.log(
      `Received request to purchase fundraising with id: ${fundraisingId} by user: ${userId} for quantity: ${quantity}`,
    )

    const fundraising = await this.fundraisingRepository.findById(fundraisingId)
    console.log(`Fundraising found: ${JSON.stringify(fundraising)}`)

    if (!fundraising) {
      console.error('Fundraising not found')
      throw new Error('Fundraising not found')
    }

    if (fundraising.quantityAvailable < quantity) {
      console.error('Insufficient quantity available')
      throw new Error('Insufficient quantity available')
    }

    const pricePurchased = quantity * fundraising.price
    console.log(`Price purchased: ${pricePurchased}`)

    const purchase = await this.fundraisingPurchaseRepository.create({
      fundraising: fundraisingId,
      user: userId,
      quantity,
      pricePurchased,
      priceSold: pricePurchased,
    })
    console.log(`Purchase created: ${JSON.stringify(purchase)}`)

    fundraising.quantityAvailable -= quantity
    fundraising.quantitySold += quantity
    await this.fundraisingRepository.update(fundraising.id, {
      quantityAvailable: fundraising.quantityAvailable,
      quantitySold: fundraising.quantitySold,
    })
    console.log(`Fundraising updated: ${JSON.stringify(fundraising)}`)

    return purchase
  }
}

export { PurchaseFundraisingUseCase }
