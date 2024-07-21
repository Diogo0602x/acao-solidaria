import { FundraisingPurchase } from '@modules/fundraising/infra/mongoose/schemas/FundraisingPurchase'

interface IFundraisingPurchaseRepository {
  create(data: {
    fundraising: string
    user: string
    quantity: number
  }): Promise<FundraisingPurchase>
  findByUserId(userId: string): Promise<FundraisingPurchase[]>
}

export { IFundraisingPurchaseRepository }
