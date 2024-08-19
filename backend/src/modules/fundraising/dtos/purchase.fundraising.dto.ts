import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PurchaseFundraisingDto {
  @ApiProperty({
    description: 'The quantity of items to purchase',
    example: 2,
  })
  @IsNumber()
  quantity: number
}
