import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserUseCase } from './create.user.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { CreateUserDto } from '@users/dtos/create-user.dto'
import { User } from '@users/entities/user.entity'
import * as bcrypt from 'bcryptjs'
import { BadRequestException } from '@nestjs/common'

jest.mock('bcryptjs')

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile()

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase)
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should successfully create a new user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      telephone: '123456789',
      role: 'pilgrim',
    }

    const hashedPassword = 'hashedPassword'
    ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword)

    const user = new User()
    user.id = 'some-uuid'
    user.name = createUserDto.name
    user.email = createUserDto.email
    user.password = hashedPassword
    user.telephone = createUserDto.telephone
    ;(usersRepository.findByEmail as jest.Mock).mockResolvedValue(null)
    ;(usersRepository.create as jest.Mock).mockReturnValue(user)
    ;(usersRepository.save as jest.Mock).mockResolvedValue(user)

    const result = await createUserUseCase.execute(createUserDto)

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(
      createUserDto.email,
    )
    expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 8)
    expect(usersRepository.create).toHaveBeenCalledWith({
      ...createUserDto,
      password: hashedPassword,
    })
    expect(usersRepository.save).toHaveBeenCalledWith(user)
    expect(result).toEqual(user)
  })

  it('should throw BadRequestException if email is already in use', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      telephone: '123456789',
      role: 'pilgrim',
    }

    ;(usersRepository.findByEmail as jest.Mock).mockResolvedValue(new User())

    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow(
      BadRequestException,
    )
    expect(usersRepository.findByEmail).toHaveBeenCalledWith(
      createUserDto.email,
    )
  })
})
