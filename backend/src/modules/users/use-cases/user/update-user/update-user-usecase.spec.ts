import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { UpdateUserUseCase } from '@modules/users/use-cases/user/update-user/update-user-usecase'
import { CreateUserUseCase } from '@modules/users/use-cases/user/create-user/create-user-usecase'

let fakeUserRepository: FakeUserRepository
let updateUser: UpdateUserUseCase
let createUser: CreateUserUseCase

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    updateUser = new UpdateUserUseCase(fakeUserRepository)
    createUser = new CreateUserUseCase(fakeUserRepository)
  })

  it('should be able to update a user', async () => {
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

    const updatedUser = await updateUser.execute(user.id, {
      name: 'João Pedro Silva',
    })

    expect(updatedUser?.name).toBe('João Pedro Silva')
  })

  it('should return null if user not found', async () => {
    const result = await updateUser.execute('non-existing-id', {
      name: 'João Pedro Silva',
    })

    expect(result).toBeNull()
  })
})
