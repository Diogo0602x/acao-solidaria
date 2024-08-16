import { Injectable, BadRequestException } from '@nestjs/common'
import { UsersRepository } from '@users/repositories/users.repository'
import { CreateUserDto } from '@users/dtos/create.user.dto'
import { User } from '@users/entities/user.entity'
import * as bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role, cpf, cnpj, linkedTo } = createUserDto

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new BadRequestException('Email already in use')
    }

    if ((role === 'church' || role === 'seminary') && !cnpj) {
      throw new BadRequestException(
        'CNPJ is required for role church or seminary.',
      )
    }

    if (
      (role === 'priest' || role === 'seminarist' || role === 'pilgrim') &&
      !cpf
    ) {
      throw new BadRequestException(
        'CPF is required for role priest, seminarist, or pilgrim.',
      )
    }

    if (
      (role === 'priest' || role === 'seminarist' || role === 'pilgrim') &&
      !linkedTo
    ) {
      throw new BadRequestException(
        'linkedTo is required for role priest, seminarist, or pilgrim.',
      )
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })

    const savedUser = await this.usersRepository.save(user)

    this.createUserDirectories(savedUser.id)

    return savedUser
  }

  private createUserDirectories(userId: string): void {
    const userDir = path.resolve(
      __dirname,
      `../../../../../acao-solidaria-storage/users/${userId}`,
    )
    const fundraisingDir = path.join(userDir, 'fundraising')
    const certificatesDir = path.join(userDir, 'certificates')

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }

    if (!fs.existsSync(fundraisingDir)) {
      fs.mkdirSync(fundraisingDir, { recursive: true })
    }

    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir, { recursive: true })
    }
  }
}
