import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from '@modules/users/infra/mongoose/schemas/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

interface IRequest {
  identifier: string // email, cpf, or cnpj
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
      user = await this.userRepository.findByCnpjCpf(identifier)
    }

    if (!user) {
      throw new Error('Identificador ou senha inválidos')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Identificador ou senha inválidos')
    }

    const token = sign({}, 'secret', {
      subject: user.id,
      expiresIn: '1d',
    })

    return { user, token }
  }
}

export { AuthenticateUserUseCase }
