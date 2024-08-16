import { Test, TestingModule } from '@nestjs/testing'
import { ListUsersUseCase } from './list.users.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { User } from '@users/entities/user.entity'

describe('ListUsersUseCase', () => {
  let listUsersUseCase: ListUsersUseCase
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUsersUseCase,
        {
          provide: UsersRepository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile()

    listUsersUseCase = module.get<ListUsersUseCase>(ListUsersUseCase)
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should return a list of users', async () => {
    const users: User[] = [
      {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        role: 'pilgrim',
        telephone: '123456789',
      } as User,
      {
        id: 'user2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'hashedPassword',
        role: 'priest',
        telephone: '987654321',
      } as User,
    ]

    jest.spyOn(usersRepository, 'find').mockResolvedValue(users)

    const result = await listUsersUseCase.execute()

    expect(result).toEqual(users)
  })
})
