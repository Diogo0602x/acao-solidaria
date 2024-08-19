import { Repository } from 'typeorm'
import { Purchase } from '@fundraising/entities/purchase.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PurchaseRepository extends Repository<Purchase> {
  constructor(
    @InjectRepository(Purchase)
    private readonly repository: Repository<Purchase>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
