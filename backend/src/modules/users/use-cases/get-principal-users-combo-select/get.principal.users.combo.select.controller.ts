import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { GetPrincipalUsersComboSelectUseCase } from '@users/use-cases/get-principal-users-combo-select/get.principal.users.combo.select.usecase'
import { ComboSelectDto } from '@users/dtos/combo.select.dto'

@ApiTags('Users')
@Controller('users')
export class GetPrincipalUsersComboSelectController {
  constructor(
    private readonly getPrincipalUsersComboSelectUseCase: GetPrincipalUsersComboSelectUseCase,
  ) {}

  @Get('principal-users/combo-select')
  @ApiOperation({
    summary: 'Get principal users (church and seminary) for combo select',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users formatted for combo select',
    type: [ComboSelectDto],
  })
  @ApiResponse({
    status: 404,
    description: 'No users found',
  })
  async getPrincipalUsersComboSelect(): Promise<ComboSelectDto[]> {
    return this.getPrincipalUsersComboSelectUseCase.execute()
  }
}
