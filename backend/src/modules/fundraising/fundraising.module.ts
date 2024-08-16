import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import { FundraisingRepository } from '@fundraising/repositories/fundraising.repository'
import { CreateFundraisingUseCase } from '@fundraising/use-cases/create-fundraising/create.fundraising.usecase'
import { CreateFundraisingController } from '@fundraising/use-cases/create-fundraising/create.fundraising.controller'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Fundraising]),
    UsersModule, // Import UsersModule to access UsersRepository
  ],
  controllers: [CreateFundraisingController],
  providers: [
    CreateFundraisingUseCase,
    FundraisingRepository, // Register FundraisingRepository as a provider
  ],
  exports: [FundraisingRepository],
})
export class FundraisingModule {}
