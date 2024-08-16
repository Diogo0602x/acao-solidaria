import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ListUsersUseCase } from '@users/use-cases/list-users/list.users.usecase'
import { User } from '@users/entities/user.entity'

@ApiTags('Users')
@Controller('users')
export class ListUsersController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  async list(): Promise<User[]> {
    return this.listUsersUseCase.execute()
  }
}
