import { Controller, Post, Body, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { PurchaseFundraisingUseCase } from '@fundraising/use-cases/purchase-fundraising/purchase.fundraising.usecase'
import { Purchase } from '@fundraising/entities/purchase.entity'
import { PurchaseFundraisingDto } from '@fundraising/dtos/purchase.fundraising.dto'
import { GetUser } from '@auth/decorators/get.user.decorator'
import { User } from '@users/entities/user.entity'

@ApiTags('Purchases')
@Controller('purchases')
export class PurchaseController {
  constructor(
    private readonly purchaseFundraisingUseCase: PurchaseFundraisingUseCase,
  ) {}

  @Post(':fundraisingId')
  @ApiOperation({ summary: 'Purchase a fundraising item' })
  @ApiResponse({
    status: 201,
    description: 'The purchase has been successfully completed.',
    type: Purchase,
  })
  async purchase(
    @Param('fundraisingId') fundraisingId: string,
    @Body() purchaseFundraisingDto: PurchaseFundraisingDto,
    @GetUser() user: User, // Assuming @GetUser is a custom decorator to get the authenticated user
  ): Promise<Purchase> {
    const { quantity } = purchaseFundraisingDto
    return this.purchaseFundraisingUseCase.execute(
      user.id,
      fundraisingId,
      quantity,
    )
  }
}
