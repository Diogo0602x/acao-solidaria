import { Injectable, BadRequestException } from '@nestjs/common'
import { UsersRepository } from '@users/repositories/users.repository'
import { CreateUserDto } from '@users/dtos/create-user.dto'
import { User } from '@users/entities/user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new BadRequestException('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })

    return this.usersRepository.save(user)
  }
}
