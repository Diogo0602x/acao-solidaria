import { Repository } from 'typeorm'
import { User } from '@users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } })
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.findOne({ where: { cpf } })
  }

  async findByCnpj(cnpj: string): Promise<User | null> {
    return this.findOne({ where: { cnpj } })
  }
}
