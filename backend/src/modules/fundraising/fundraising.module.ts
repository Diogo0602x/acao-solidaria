import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import { FundraisingRepository } from '@fundraising/repositories/fundraising.repository'
import { Purchase } from '@fundraising/entities/purchase.entity'
import { PurchaseRepository } from '@fundraising/repositories/purchase.repository'
import { CreateFundraisingUseCase } from '@fundraising/use-cases/create-fundraising/create.fundraising.usecase'
import { PurchaseFundraisingUseCase } from '@fundraising/use-cases/purchase-fundraising/purchase.fundraising.usecase'
import { CreateFundraisingController } from '@fundraising/use-cases/create-fundraising/create.fundraising.controller'
import { PurchaseController } from '@fundraising/use-cases/purchase-fundraising/purchase.fundraising.controller'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Fundraising, Purchase]), UsersModule],
  controllers: [CreateFundraisingController, PurchaseController],
  providers: [
    CreateFundraisingUseCase,
    FundraisingRepository,
    PurchaseFundraisingUseCase,
    PurchaseRepository,
  ],
  exports: [FundraisingRepository, PurchaseRepository],
})
export class FundraisingModule {}
