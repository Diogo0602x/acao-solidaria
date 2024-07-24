import { v4 as uuid } from 'uuid'
import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'
import { IFundraisingPurchaseRepository } from '@modules/fundraising/repositories/IFundraisingPurchaseRepository'

class FakeFundraisingPurchaseRepository
  implements IFundraisingPurchaseRepository
{
  private fundraisingPurchases: FundraisingPurchase[] = []

  public async create(data: {
    fundraising: string
    user: string
    quantity: number
    pricePurchased: number
    priceSold: number
  }): Promise<FundraisingPurchase> {
    const fundraisingPurchase = new FundraisingPurchase()

    Object.assign(fundraisingPurchase, { id: uuid() }, data)

    this.fundraisingPurchases.push(fundraisingPurchase)

    return fundraisingPurchase
  }

  public async findByUserId(userId: string): Promise<FundraisingPurchase[]> {
    return this.fundraisingPurchases.filter(
      (purchase) => purchase.user.toString() === userId,
    )
  }

  public async findByFundraisingId(
    fundraisingId: string,
  ): Promise<FundraisingPurchase[]> {
    return this.fundraisingPurchases.filter(
      (purchase) => purchase.fundraising.toString() === fundraisingId,
    )
  }
}

export { FakeFundraisingPurchaseRepository }
