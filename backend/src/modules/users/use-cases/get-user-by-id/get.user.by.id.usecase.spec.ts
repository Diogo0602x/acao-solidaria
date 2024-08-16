import { Test, TestingModule } from '@nestjs/testing'
import { GetUserByIdUseCase } from './get.user.by.id.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { User } from '@users/entities/user.entity'

describe('GetUserByIdUseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdUseCase,
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    getUserByIdUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase)
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should return the user when found', async () => {
    const user = new User()
    user.id = 'user1'
    user.name = 'John Doe'
    user.email = 'john@example.com'
    user.password = 'hashedPassword'
    user.role = 'pilgrim'
    user.telephone = '123456789'

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user)

    const result = await getUserByIdUseCase.execute('user1')

    expect(result).toEqual(user)
  })

  it('should return null when user is not found', async () => {
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null)

    const result = await getUserByIdUseCase.execute('non-existing-id')

    expect(result).toBeNull()
  })
})
