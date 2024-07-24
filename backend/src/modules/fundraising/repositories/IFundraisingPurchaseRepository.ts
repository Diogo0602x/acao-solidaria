import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'

interface IFundraisingPurchaseRepository {
  create(data: {
    fundraising: string
    user: string
    quantity: number
    pricePurchased: number
    priceSold: number
  }): Promise<FundraisingPurchase>
  findByUserId(userId: string): Promise<FundraisingPurchase[]>
  findByFundraisingId(fundraisingId: string): Promise<FundraisingPurchase[]>
}

export { IFundraisingPurchaseRepository }
