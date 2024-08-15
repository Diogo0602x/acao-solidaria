import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Roles } from '@users/types'

@ValidatorConstraint({ name: 'RoleValidation', async: false })
export class RoleValidation implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const role = (args.object as Roles).role
    if (role === 'church' || role === 'seminary') {
      return value != null
    } else if (
      role === 'priest' ||
      role === 'seminarist' ||
      role === 'pilgrim'
    ) {
      return value != null
    }
    return true
  }

  defaultMessage(args: ValidationArguments) {
    const role = (args.object as Roles).role
    if (role === 'church' || role === 'seminary') {
      return 'CNPJ must be provided for role church or seminary.'
    } else if (
      role === 'priest' ||
      role === 'seminarist' ||
      role === 'pilgrim'
    ) {
      return 'CPF must be provided for role priest, seminarist, or pilgrim.'
    }
    return 'Invalid role specified.'
  }
}

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'The role of the user',
    example: 'church | seminary | priest | seminarist | pilgrim',
  })
  @IsString()
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
    description:
      'The CPF of the user (required for priest, seminarist, pilgrim)',
    example: '123.456.789-00',
  })
  @ValidateIf(
    (o) =>
      o.role === 'priest' || o.role === 'seminarist' || o.role === 'pilgrim',
  )
  @IsNotEmpty({ message: 'CPF is required for this role' })
  @IsString()
  cpf?: string

  @ApiPropertyOptional({
    description: 'The CNPJ of the user (required for church, seminary)',
    example: '12.345.678/0001-99',
  })
  @ValidateIf((o) => o.role === 'church' || o.role === 'seminary')
  @IsNotEmpty({ message: 'CNPJ is required for this role' })
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
    description:
      'The ID of the user to whom this user is linked (required for priest, seminarist, pilgrim)',
    example: 'uuid-linked-to',
  })
  @ValidateIf(
    (o) =>
      o.role === 'priest' || o.role === 'seminarist' || o.role === 'pilgrim',
  )
  @IsNotEmpty({ message: 'linkedTo is required for this role' })
  @IsString()
  linkedTo?: string
}
