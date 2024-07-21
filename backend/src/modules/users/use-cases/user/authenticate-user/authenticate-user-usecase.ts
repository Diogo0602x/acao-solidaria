import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from '@modules/users/infra/mongoose/schemas/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

interface IRequest {
  identifier: string // email or cpf
  password: string
}

interface IResponse {
  user: User
  token: string
}

class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ identifier, password }: IRequest): Promise<IResponse> {
    let user: User | null = null

    if (identifier.includes('@')) {
      user = await this.userRepository.findByEmail(identifier)
    } else {
      user = await this.userRepository.findByCpf(identifier)
    }

    if (!user) {
      throw new Error('Invalid identifier or password')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Invalid identifier or password')
    }

    const token = sign({}, 'secret', {
      subject: user.id,
      expiresIn: '1d',
    })

    return { user, token }
  }
}

export { AuthenticateUserUseCase }
