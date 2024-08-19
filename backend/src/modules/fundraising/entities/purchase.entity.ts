import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from '@users/entities/user.entity'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('purchases')
export class Purchase {
  @ApiProperty({
    description: 'The unique identifier of the purchase',
    example: 'uuid-example',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: 'The quantity of items purchased',
    example: 10,
  })
  @Column()
  quantity: number

  @ApiProperty({
    description: 'The total price of the purchase',
    example: 100.0,
  })
  @Column()
  totalPrice: number

  @ApiProperty({
    description: 'The user who made the purchase',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.purchases, { eager: true })
  user: User

  @ApiProperty({
    description: 'The fundraising that was purchased',
    type: () => Fundraising,
  })
  @ManyToOne(() => Fundraising, (fundraising) => fundraising.purchases, {
    eager: true,
  })
  fundraising: Fundraising
}
