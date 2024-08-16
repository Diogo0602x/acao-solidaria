import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateFundraisingDto } from '@fundraising/dtos/create.fundraising.dto'
import { CreateFundraisingUseCase } from '@fundraising/use-cases/create-fundraising/create.fundraising.usecase'
import { Fundraising } from '@fundraising/entities/fundraising.entity'

@ApiTags('Fundraising')
@Controller('fundraising')
export class CreateFundraisingController {
  constructor(
    private readonly createFundraisingUseCase: CreateFundraisingUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new fundraising event' })
  @ApiResponse({
    status: 201,
    description: 'The fundraising has been successfully created.',
    type: Fundraising,
  })
  async create(
    @Body() createFundraisingDto: CreateFundraisingDto,
  ): Promise<Fundraising> {
    return this.createFundraisingUseCase.execute(createFundraisingDto)
  }
}
