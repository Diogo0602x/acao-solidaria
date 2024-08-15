import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { UsersRepository } from '@users/repositories/users.repository'
import { UpdateUserDto } from '@users/dtos/update.user.dto'
import { User } from '@users/entities/user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const userExists = await this.usersRepository.findByEmail(
        updateUserDto.email,
      )
      if (userExists) {
        throw new BadRequestException('Email already in use')
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8)
    }

    Object.assign(user, updateUserDto)

    return this.usersRepository.save(user)
  }
}
