import { Controller, Get, Param, NotFoundException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { GetUserByIdUseCase } from '@users/use-cases/get-user-by-id/get.user.by.id.usecase'
import { User } from '@users/entities/user.entity'

@ApiTags('Users')
@Controller('users')
export class GetUserByIdController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.getUserByIdUseCase.execute(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
