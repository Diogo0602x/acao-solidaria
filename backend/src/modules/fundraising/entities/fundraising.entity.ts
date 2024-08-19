import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { User } from '@users/entities/user.entity'
import { Purchase } from '@fundraising/entities/purchase.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('fundraisings')
export class Fundraising {
  @ApiProperty({
    description: 'The unique identifier of the fundraising',
    example: 'uuid-example',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: 'The name of the fundraising',
    example: 'Fundraising Event',
  })
  @Column()
  name: string

  @ApiProperty({ description: 'Total quantity of items', example: 100 })
  @Column()
  quantity: number

  @ApiProperty({ description: 'Available quantity of items', example: 100 })
  @Column()
  quantityAvailable: number

  @ApiProperty({ description: 'Price per item', example: 10.0 })
  @Column()
  price: number

  @ApiProperty({
    description: 'Image path for the fundraising',
    example: 'path/to/image.jpg',
  })
  @Column()
  image: string

  @ApiProperty({
    description: 'PIX Key (CPF) for payment',
    example: '123.456.789-00',
  })
  @Column({ nullable: true })
  pixKeyCpf?: string

  @ApiProperty({
    description: 'PIX Key (CNPJ) for payment',
    example: '12.345.678/0001-99',
  })
  @Column({ nullable: true })
  pixKeyCnpj?: string

  @ApiProperty({
    description: 'PIX Key (Random Key) for payment',
    example: 'random-key',
  })
  @Column({ nullable: true })
  pixKeyChaveAleatoria?: string

  @ApiProperty({ description: 'The user who created the fundraising' })
  @ManyToOne(() => User, (user) => user.fundraisings, { lazy: true })
  user: Promise<User>

  @OneToMany(() => Purchase, (purchase) => purchase.fundraising, { lazy: true })
  purchases: Promise<Purchase[]>
}
