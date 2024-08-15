import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    description: 'The identifier of the user, can be an email, CPF, or CNPJ',
    example: 'user@example.com or 123.456.789-00 or 12.345.678/0001-99',
  })
  @IsString()
  @IsNotEmpty()
  identifier: string

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
