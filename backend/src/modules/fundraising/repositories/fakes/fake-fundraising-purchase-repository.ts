import { IFundraisingPurchaseRepository } from '@modules/fundraising/repositories/IFundraisingPurchaseRepository'
import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'
import { ObjectId } from 'bson'

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
    const purchase: FundraisingPurchase = {
      ...data,
      _id: new ObjectId().toString(),
      id: new ObjectId().toString(),
    } as unknown as FundraisingPurchase
    this.fundraisingPurchases.push(purchase)
    return purchase
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
