import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UserRepository } from '@modules/users/infra/mongoose/repositories/UserRepository'
import { User } from '@modules/users/infra/mongoose/schemas/User'

interface IRequest {
  identifier: string // email or cpf
  password: string
}

interface IResponse {
  user: User
  token: string
}

class AuthenticateUserUseCase {
  public async execute({ identifier, password }: IRequest): Promise<IResponse> {
    const userRepository = new UserRepository()

    let user: User | null = null

    if (identifier.includes('@')) {
      user = await userRepository.findByEmail(identifier)
    } else {
      user = await userRepository.findByCpf(identifier)
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
