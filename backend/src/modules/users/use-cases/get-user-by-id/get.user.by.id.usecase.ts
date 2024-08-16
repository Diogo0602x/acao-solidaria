import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@users/repositories/users.repository'
import { User } from '@users/entities/user.entity'

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } })
  }
}
