import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from '@modules/users/infra/mongoose/schemas/User'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Invalid email or password')
    }

    const token = sign({}, 'secret', {
      subject: user.id,
      expiresIn: '1d',
    })

    return { user, token }
  }
}

export { AuthenticateUserService }
