import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from '@users/repositories/users.repository'

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.usersRepository.remove(user)
  }
}
