import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    description: 'The identifier of the user, can be an email, CPF, or CNPJ',
    example: 'email | cpf | cnpj',
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
