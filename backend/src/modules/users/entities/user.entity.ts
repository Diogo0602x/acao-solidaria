import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'uuid-example',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @Column()
  name: string

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string

  @ApiProperty({
    description: 'The hashed password of the user',
    example: 'hashed_password',
  })
  @Column()
  password: string

  @ApiPropertyOptional({
    description: 'The CPF of the user',
    example: '123.456.789-00',
  })
  @Column({ nullable: true })
  cpf?: string

  @ApiPropertyOptional({
    description: 'The CNPJ of the user',
    example: '12.345.678/0001-99',
  })
  @Column({ nullable: true })
  cnpj?: string

  @ApiProperty({
    description: 'The telephone number of the user',
    example: '(11) 1234-5678',
  })
  @Column()
  telephone: string

  @ApiPropertyOptional({
    description: 'The address of the user',
    example: {
      street: 'Rua da Consolação',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
      complement: 'Próximo ao metrô',
    },
  })
  @Column('jsonb', { nullable: true })
  address?: {
    street: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    complement?: string
  }

  @ApiProperty({ description: 'The role of the user', example: 'pilgrim' })
  @Column({ default: 'pilgrim' })
  role: string

  @ApiPropertyOptional({
    description: 'The ID of the user to whom this user is linked',
    example: 'uuid-linked-to',
  })
  @Column({ nullable: true })
  linkedTo?: string
}
