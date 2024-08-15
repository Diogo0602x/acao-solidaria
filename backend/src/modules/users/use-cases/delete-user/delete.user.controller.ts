import { Controller, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { DeleteUserUseCase } from '@users/use-cases/delete-user/delete.user.usecase'

@ApiTags('Users')
@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an existing user' })
  @ApiResponse({ status: 204, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id)
  }
}
