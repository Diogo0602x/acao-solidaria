import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserUseCase } from '@users/use-cases/create-user/create-user.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '@users/entities/user.entity'

describe('CreateUserUseCase', () => {
  let service: CreateUserUseCase
  let repository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<CreateUserUseCase>(CreateUserUseCase)
    repository = module.get<UsersRepository>(
      getRepositoryToken(UsersRepository),
    )
  })

  it('should create a user successfully', async () => {
    const userDto = {
      role: 'pilgrim',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
      telephone: '1234567890',
      address: {
        street: '123 Main St',
        neighborhood: 'Downtown',
        city: 'Cityville',
        state: 'CA',
        zipCode: '12345',
      },
    }

    const userEntity = new User()
    Object.assign(userEntity, userDto)

    jest.spyOn(repository, 'create').mockReturnValue(userEntity)
    jest.spyOn(repository, 'save').mockResolvedValue(userEntity)

    const result = await service.execute(userDto)

    expect(result).toEqual(userEntity)
    expect(repository.create).toHaveBeenCalledWith(userDto)
    expect(repository.save).toHaveBeenCalledWith(userEntity)
  })
})
