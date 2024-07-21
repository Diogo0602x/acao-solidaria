import { v4 as uuid } from 'uuid'
import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'

class FakeFundraisingPurchaseRepository {
  private fundraisingPurchases: FundraisingPurchase[] = []

  public async create(data: {
    fundraising: string
    user: string
    quantity: number
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
}

export { FakeFundraisingPurchaseRepository }
