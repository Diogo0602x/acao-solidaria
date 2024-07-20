import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { PrincipalUserRepository } from '@modules/users/infra/mongoose/repositories/PrincipalUserRepository'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'

interface IRequest {
  identifier: string // email or cnpj
  password: string
}

interface IResponse {
  principalUser: PrincipalUser
  token: string
}

class AuthenticatePrincipalUserUseCase {
  public async execute({ identifier, password }: IRequest): Promise<IResponse> {
    const principalUserRepository = new PrincipalUserRepository()

    let principalUser: PrincipalUser | null = null

    if (identifier.includes('@')) {
      principalUser = await principalUserRepository.findByEmail(identifier)
    } else {
      principalUser = await principalUserRepository.findByCnpj(identifier)
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
