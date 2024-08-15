import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersRepository } from '@users/repositories/users.repository'
import { LoginDto } from '@auth/dtos/login.dto'
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { User } from '@users/entities/user.entity'

@Injectable()
export class LoginService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    identifier,
    password,
  }: LoginDto): Promise<{ token: string; user: User }> {
    let user: User | null = null

    if (this.isEmail(identifier)) {
      user = await this.usersRepository.findByEmail(identifier)
    } else if (this.isCpf(identifier)) {
      user = await this.usersRepository.findByCpf(identifier)
    } else if (this.isCnpj(identifier)) {
      user = await this.usersRepository.findByCnpj(identifier)
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Generate the JWT token
    const payload = { sub: user.id, name: user.name }
    const token = this.jwtService.sign(payload)

    // Return the token and the user data
    return { token, user }
  }

  private isEmail(identifier: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
  }

  private isCpf(identifier: string): boolean {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(identifier)
  }

  private isCnpj(identifier: string): boolean {
    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(identifier)
  }
}
