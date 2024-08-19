import { Test, TestingModule } from '@nestjs/testing'
import { LoginUseCase } from '@auth/use-cases/login/login.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { JwtService } from '@nestjs/jwt'
import { User } from '@users/entities/user.entity'
import { UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcryptjs'

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}))

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase
  let usersRepository: UsersRepository
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            findByCpf: jest.fn(),
            findByCnpj: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile()

    loginUseCase = module.get<LoginUseCase>(LoginUseCase)
    usersRepository = module.get<UsersRepository>(UsersRepository)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should return a token and user data on successful login with email', async () => {
    const user = new User()
    user.id = 'uuid-example'
    user.email = 'user@example.com'
    user.password = 'hashed_password'
    user.name = 'John Doe'

    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(user)
    ;(compare as jest.Mock).mockResolvedValue(true)
    jest.spyOn(jwtService, 'sign').mockReturnValue('jwt_token_example')

    const result = await loginUseCase.execute({
      identifier: 'user@example.com',
      password: 'password123',
    })

    expect(result).toEqual({
      token: 'jwt_token_example',
      user,
    })
  })

  it('should return a token and user data on successful login with CPF', async () => {
    const user = new User()
    user.id = 'uuid-example'
    user.cpf = '123.456.789-00'
    user.password = 'hashed_password'
    user.name = 'John Doe'

    jest.spyOn(usersRepository, 'findByCpf').mockResolvedValue(user)
    ;(compare as jest.Mock).mockResolvedValue(true)
    jest.spyOn(jwtService, 'sign').mockReturnValue('jwt_token_example')

    const result = await loginUseCase.execute({
      identifier: '123.456.789-00',
      password: 'password123',
    })

    expect(result).toEqual({
      token: 'jwt_token_example',
      user,
    })
  })

  it('should return a token and user data on successful login with CNPJ', async () => {
    const user = new User()
    user.id = 'uuid-example'
    user.cnpj = '12.345.678/0001-99'
    user.password = 'hashed_password'
    user.name = 'John Doe'

    jest.spyOn(usersRepository, 'findByCnpj').mockResolvedValue(user)
    ;(compare as jest.Mock).mockResolvedValue(true)
    jest.spyOn(jwtService, 'sign').mockReturnValue('jwt_token_example')

    const result = await loginUseCase.execute({
      identifier: '12.345.678/0001-99',
      password: 'password123',
    })

    expect(result).toEqual({
      token: 'jwt_token_example',
      user,
    })
  })

  it('should throw UnauthorizedException if credentials are invalid', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(null)

    await expect(
      loginUseCase.execute({
        identifier: 'invalid@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException if password does not match', async () => {
    const user = new User()
    user.id = 'uuid-example'
    user.email = 'user@example.com'
    user.password = 'hashed_password'
    user.name = 'John Doe'

    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(user)
    ;(compare as jest.Mock).mockResolvedValue(false)

    await expect(
      loginUseCase.execute({
        identifier: 'user@example.com',
        password: 'wrong_password',
      }),
    ).rejects.toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException if identifier does not match any format', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(null)
    jest.spyOn(usersRepository, 'findByCpf').mockResolvedValue(null)
    jest.spyOn(usersRepository, 'findByCnpj').mockResolvedValue(null)

    await expect(
      loginUseCase.execute({
        identifier: 'invalid-identifier',
        password: 'password123',
      }),
    ).rejects.toThrow(UnauthorizedException)
  })
})
