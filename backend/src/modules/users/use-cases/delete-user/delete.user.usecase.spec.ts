import { Test, TestingModule } from '@nestjs/testing'
import { DeleteUserUseCase } from '@users/use-cases/delete-user/delete.user.usecase'
import { UsersRepository } from '@users/repositories/users.repository'
import { NotFoundException } from '@nestjs/common'
import { User } from '@users/entities/user.entity'

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase)
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should successfully delete an existing user', async () => {
    const user = new User()
    user.id = 'some-uuid'
    ;(usersRepository.findOne as jest.Mock).mockResolvedValue(user)
    ;(usersRepository.remove as jest.Mock).mockResolvedValue(undefined)

    await deleteUserUseCase.execute(user.id)

    expect(usersRepository.findOne).toHaveBeenCalledWith({
      where: { id: user.id },
    })
    expect(usersRepository.remove).toHaveBeenCalledWith(user)
  })

  it('should throw NotFoundException if user is not found', async () => {
    ;(usersRepository.findOne as jest.Mock).mockResolvedValue(null)

    await expect(deleteUserUseCase.execute('non-existing-id')).rejects.toThrow(
      NotFoundException,
    )
  })
})
