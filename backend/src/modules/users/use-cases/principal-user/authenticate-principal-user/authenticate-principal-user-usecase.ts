import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'
import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'

interface IRequest {
  identifier: string // email or cnpj
  password: string
}

interface IResponse {
  principalUser: PrincipalUser
  token: string
}

class AuthenticatePrincipalUserUseCase {
  constructor(private principalUserRepository: IPrincipalUserRepository) {}

  public async execute({ identifier, password }: IRequest): Promise<IResponse> {
    let principalUser: PrincipalUser | null = null

    if (identifier.includes('@')) {
      principalUser = await this.principalUserRepository.findByEmail(identifier)
    } else {
      principalUser = await this.principalUserRepository.findByCnpj(identifier)
    }

    if (!principalUser) {
      throw new Error('Invalid identifier or password')
    }

    const passwordMatched = await compare(password, principalUser.password)

    if (!passwordMatched) {
      throw new Error('Invalid identifier or password')
    }

    const token = sign({}, 'secret', {
      subject: principalUser.id,
      expiresIn: '1d',
    })

    return { principalUser, token }
  }
}

export { AuthenticatePrincipalUserUseCase }
