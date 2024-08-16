import { ApiProperty } from '@nestjs/swagger'

export class ComboSelectDto {
  @ApiProperty({
    description:
      'The label of the combo select option, usually the name of the user',
    example: 'Church of St. John',
  })
  label: string

  @ApiProperty({
    description:
      'The value of the combo select option, usually the ID of the user',
    example: 'uuid-example-1',
  })
  value: string
}
