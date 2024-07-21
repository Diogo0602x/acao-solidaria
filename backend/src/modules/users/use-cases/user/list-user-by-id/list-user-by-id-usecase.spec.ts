import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { ListUserByIdUseCase } from '@users/use-cases'
import { CreateUserUseCase } from '@modules/users/use-cases/user/create-user/create-user-usecase'

let fakeUserRepository: FakeUserRepository
let listUserById: ListUserByIdUseCase
let createUser: CreateUserUseCase

describe('ListUserById', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    listUserById = new ListUserByIdUseCase(fakeUserRepository)
    createUser = new CreateUserUseCase(fakeUserRepository)
  })

  it('should be able to list a user by id', async () => {
    const user = await createUser.execute({
      name: 'João Silva',
      email: 'joao.silva@example.com',
      password: 'senha123',
      confirmPassword: 'senha123',
      role: 'priest',
      cpf: '123.456.789-00',
      telephone: '(11) 1234-5678',
      address: {
        street: 'Rua da Consolação',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
      },
      linkedTo: 'principalUserId',
    })

    const foundUser = await listUserById.execute(user.id)

    expect(foundUser?.id).toBe(user.id)
  })
})
