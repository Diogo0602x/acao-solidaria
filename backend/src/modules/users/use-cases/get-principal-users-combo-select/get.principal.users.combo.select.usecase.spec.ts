import { Test, TestingModule } from '@nestjs/testing'
import { GetPrincipalUsersComboSelectUseCase } from '@users/use-cases/get-principal-users-combo-select/get.principal.users.combo.select.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { User } from '@users/entities/user.entity'

describe('GetPrincipalUsersComboSelectUseCase', () => {
  let getPrincipalUsersComboSelectUseCase: GetPrincipalUsersComboSelectUseCase
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPrincipalUsersComboSelectUseCase,
        {
          provide: UsersRepository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile()

    getPrincipalUsersComboSelectUseCase =
      module.get<GetPrincipalUsersComboSelectUseCase>(
        GetPrincipalUsersComboSelectUseCase,
      )
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should return principal users with correct format', async () => {
    const users: User[] = [
      {
        id: 'uuid-example-1',
        name: 'Church of St. John',
        role: 'church',
      } as User,
      {
        id: 'uuid-example-2',
        name: 'Seminary of St. Mary',
        role: 'seminary',
      } as User,
    ]

    jest.spyOn(usersRepository, 'find').mockResolvedValue(users)

    const result = await getPrincipalUsersComboSelectUseCase.execute()

    expect(result).toEqual([
      { label: 'Church of St. John', value: 'uuid-example-1' },
      { label: 'Seminary of St. Mary', value: 'uuid-example-2' },
    ])
  })
})
