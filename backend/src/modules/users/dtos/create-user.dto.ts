import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'The role of the user',
    example: 'church | seminary | priest | seminarist | pilgrim',
  })
  @IsEmail()
  @IsNotEmpty()
  role: string

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiPropertyOptional({
    description: 'The CPF of the user',
    example: '123.456.789-00',
  })
  @IsOptional()
  @IsString()
  cpf?: string

  @ApiPropertyOptional({
    description: 'The CNPJ of the user',
    example: '12.345.678/0001-99',
  })
  @IsOptional()
  @IsString()
  cnpj?: string

  @ApiProperty({
    description: 'The telephone number of the user',
    example: '(11) 1234-5678',
  })
  @IsString()
  @IsNotEmpty()
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
  @IsOptional()
  address?: {
    street: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    complement?: string
  }

  @ApiPropertyOptional({
    description: 'The ID of the user to whom this user is linked',
    example: 'uuid-linked-to',
  })
  @IsOptional()
  @IsString()
  linkedTo?: string
}
