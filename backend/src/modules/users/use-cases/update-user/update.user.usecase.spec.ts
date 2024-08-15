import { Test, TestingModule } from '@nestjs/testing'
import { UpdateUserUseCase } from '@users/use-cases/update-user/update.user.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { User } from '@users/entities/user.entity'
import * as bcrypt from 'bcryptjs'
import { UpdateUserDto } from '@users/dtos/update.user.dto'

jest.mock('bcryptjs')

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn(),
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile()

    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase)
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should successfully update an existing user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'John Doe Updated',
      email: 'john.doe.updated@example.com',
      password: 'newpassword123',
    }

    const existingUser = new User()
    existingUser.id = 'some-uuid'
    existingUser.name = 'John Doe'
    existingUser.email = 'john.doe@example.com'
    existingUser.password = 'oldpassword'

    const hashedPassword = 'hashedPassword'
    ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword)
    ;(usersRepository.findOne as jest.Mock).mockResolvedValue(existingUser)
    ;(usersRepository.save as jest.Mock).mockResolvedValue({
      ...existingUser,
      ...updateUserDto,
      password: hashedPassword,
    })

    const result = await updateUserUseCase.execute(
      existingUser.id,
      updateUserDto,
    )

    expect(usersRepository.findOne).toHaveBeenCalledWith({
      where: { id: existingUser.id },
    })
    expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 8)
    expect(usersRepository.save).toHaveBeenCalledWith({
      ...existingUser,
      ...updateUserDto,
      password: hashedPassword,
    })
    expect(result).toEqual({
      ...existingUser,
      ...updateUserDto,
      password: hashedPassword,
    })
  })

  it('should throw NotFoundException if user is not found', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'John Doe Updated',
      email: 'john.doe.updated@example.com',
    }

    ;(usersRepository.findOne as jest.Mock).mockResolvedValue(null)

    await expect(
      updateUserUseCase.execute('non-existing-id', updateUserDto),
    ).rejects.toThrow(NotFoundException)
  })

  it('should throw BadRequestException if email is already in use', async () => {
    const updateUserDto: UpdateUserDto = {
      email: 'new.email@example.com',
    }

    const existingUser = new User()
    existingUser.id = 'some-uuid'
    existingUser.email = 'existing.email@example.com'

    const conflictingUser = new User()
    conflictingUser.id = 'conflicting-uuid'
    conflictingUser.email = 'new.email@example.com'
    ;(usersRepository.findOne as jest.Mock).mockResolvedValue(existingUser)
    ;(usersRepository.findByEmail as jest.Mock).mockResolvedValue(
      conflictingUser,
    )

    await expect(
      updateUserUseCase.execute(existingUser.id, updateUserDto),
    ).rejects.toThrow(BadRequestException)
  })
})
