import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserUseCase } from '@users/use-cases/create-user/create.user.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { CreateUserDto } from '@users/dtos/create.user.dto'
import { User } from '@users/entities/user.entity'
import * as bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'
import { BadRequestException } from '@nestjs/common'

jest.mock('bcryptjs')
jest.mock('fs')
jest.mock('path', () => {
  const originalPath = jest.requireActual('path')
  return {
    ...originalPath,
    resolve: jest.fn((...args) => originalPath.resolve(...args)),
    join: jest.fn((...args) => originalPath.join(...args)),
  }
})

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

  it('should successfully create a new user and create directories when they do not exist', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      telephone: '123456789',
      role: 'pilgrim',
      cpf: '123.456.789-00',
      linkedTo: 'some-linked-id',
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

    const existsSyncMock = fs.existsSync as jest.Mock
    const mkdirSyncMock = fs.mkdirSync as jest.Mock

    existsSyncMock.mockReturnValue(false) // Simulate directories do not exist
    mkdirSyncMock.mockImplementation(() => undefined)

    const result = await createUserUseCase.execute(createUserDto)

    const userDir = path.resolve(
      __dirname,
      `../../../../../acao-solidaria-storage/users/${user.id}`,
    )

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

    // Expect directory creation methods to be called when directories do not exist
    expect(existsSyncMock).toHaveBeenCalledTimes(3)
    expect(mkdirSyncMock).toHaveBeenCalledTimes(3)
    expect(mkdirSyncMock).toHaveBeenCalledWith(userDir, { recursive: true })
    expect(mkdirSyncMock).toHaveBeenCalledWith(
      path.join(userDir, 'fundraising'),
      { recursive: true },
    )
    expect(mkdirSyncMock).toHaveBeenCalledWith(
      path.join(userDir, 'certificates'),
      { recursive: true },
    )
  })

  it('should successfully create a new user and not create directories if they exist', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      telephone: '123456789',
      role: 'pilgrim',
      cpf: '123.456.789-00',
      linkedTo: 'some-linked-id',
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

    const existsSyncMock = fs.existsSync as jest.Mock
    const mkdirSyncMock = fs.mkdirSync as jest.Mock

    existsSyncMock.mockReturnValue(true) // Simulate directories already exist

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

    // Expect directory creation methods NOT to be called since directories exist
    expect(existsSyncMock).toHaveBeenCalledTimes(3)
    expect(mkdirSyncMock).not.toHaveBeenCalled()
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

  it('should throw BadRequestException if role is "church" and CNPJ is not provided', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Church User',
      email: 'church@example.com',
      password: 'password123',
      telephone: '123456789',
      role: 'church',
      cpf: undefined,
      cnpj: undefined,
    }

    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow(
      new BadRequestException('CNPJ is required for role church or seminary.'),
    )
  })

  it('should throw BadRequestException if role is "pilgrim" and CPF is not provided', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Pilgrim User',
      email: 'pilgrim@example.com',
      password: 'password123',
      telephone: '123456789',
      role: 'pilgrim',
      cnpj: undefined,
      cpf: undefined,
    }

    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow(
      new BadRequestException(
        'CPF is required for role priest, seminarist, or pilgrim.',
      ),
    )
  })

  it('should throw BadRequestException if role is "seminarist" and linkedTo is not provided', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Seminarist User',
      email: 'seminarist@example.com',
      password: 'password123',
      telephone: '123456789',
      role: 'seminarist',
      cpf: '123.456.789-00',
      linkedTo: undefined,
    }

    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow(
      new BadRequestException(
        'linkedTo is required for role priest, seminarist, or pilgrim.',
      ),
    )
  })
})
