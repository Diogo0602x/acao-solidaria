import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@users/repositories/users.repository'
import { User } from '@users/entities/user.entity'

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.find()
  }
}
