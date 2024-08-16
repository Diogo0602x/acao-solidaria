import { Repository } from 'typeorm'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FundraisingRepository extends Repository<Fundraising> {
  constructor(
    @InjectRepository(Fundraising)
    private readonly repository: Repository<Fundraising>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }

  async findByName(name: string): Promise<Fundraising | null> {
    return this.findOne({ where: { name } })
  }
}
