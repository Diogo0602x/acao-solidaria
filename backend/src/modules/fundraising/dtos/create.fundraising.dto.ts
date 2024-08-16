import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateFundraisingDto {
  @ApiProperty({
    description: 'The name of the fundraising',
    example: 'Fundraising Event',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'Total quantity of items', example: 100 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @ApiProperty({ description: 'Available quantity of items', example: 100 })
  @IsNumber()
  @IsNotEmpty()
  quantityAvailable: number

  @ApiProperty({ description: 'Price per item', example: 10.0 })
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty({
    description: 'Image path for the fundraising',
    example: 'path/to/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiPropertyOptional({
    description: 'PIX Key (CPF) for payment',
    example: '123.456.789-00',
  })
  @IsOptional()
  @IsString()
  pixKeyCpf?: string

  @ApiPropertyOptional({
    description: 'PIX Key (CNPJ) for payment',
    example: '12.345.678/0001-99',
  })
  @IsOptional()
  @IsString()
  pixKeyCnpj?: string

  @ApiPropertyOptional({
    description: 'PIX Key (Random Key) for payment',
    example: 'random-key',
  })
  @IsOptional()
  @IsString()
  pixKeyChaveAleatoria?: string

  @ApiProperty({
    description: 'The ID of the user associated with the fundraising',
    example: 'uuid-of-the-user',
  })
  @IsString()
  @IsNotEmpty()
  userId: string
}
