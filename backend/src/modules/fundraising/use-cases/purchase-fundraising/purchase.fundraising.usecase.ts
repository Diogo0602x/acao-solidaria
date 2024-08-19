import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { PurchaseRepository } from '@fundraising/repositories/purchase.repository'
import { FundraisingRepository } from '@fundraising/repositories/fundraising.repository'
import { UsersRepository } from '@users/repositories/users.repository'
import { Purchase } from '@fundraising/entities/purchase.entity'

@Injectable()
export class PurchaseFundraisingUseCase {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly fundraisingRepository: FundraisingRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    userId: string,
    fundraisingId: string,
    quantity: number,
  ): Promise<Purchase> {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const fundraising = await this.fundraisingRepository.findOne({
      where: { id: fundraisingId },
    })
    if (!fundraising) {
      throw new NotFoundException('Fundraising not found')
    }

    if (fundraising.quantityAvailable < quantity) {
      throw new BadRequestException('Not enough quantity available')
    }

    const purchase = new Purchase()
    purchase.user = user
    purchase.fundraising = fundraising
    purchase.quantity = quantity
    purchase.totalPrice = quantity * fundraising.price

    // Decrement the quantity available
    fundraising.quantityAvailable -= quantity
    await this.fundraisingRepository.save(fundraising)

    return await this.purchaseRepository.save(purchase)
  }
}
