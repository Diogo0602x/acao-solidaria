import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@users/repositories/users.repository'

interface ComboSelectDto {
  label: string
  value: string
}

@Injectable()
export class GetPrincipalUsersComboSelectUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<ComboSelectDto[]> {
    const users = await this.usersRepository.find({
      where: [{ role: 'church' }, { role: 'seminary' }],
      select: ['id', 'name'],
    })

    return users.map((user) => ({
      label: user.name,
      value: user.id,
    }))
  }
}
