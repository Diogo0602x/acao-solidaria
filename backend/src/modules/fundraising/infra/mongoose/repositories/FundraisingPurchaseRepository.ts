import { FundraisingPurchase } from '../schemas/FundraisingPurchase'

class FundraisingPurchaseRepository {
  public async create(data: {
    fundraising: string
    user: string
    quantity: number
  }): Promise<FundraisingPurchase> {
    const purchase = new FundraisingPurchase(data)
    await purchase.save()
    return purchase
  }

  public async findByUserId(userId: string): Promise<FundraisingPurchase[]> {
    return FundraisingPurchase.find({ user: userId })
      .populate('fundraising')
      .exec()
  }
}

export { FundraisingPurchaseRepository }
