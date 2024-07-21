import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { CreateUserUseCase } from '@modules/users/use-cases/user/create-user/create-user-usecase'

let fakeUserRepository: FakeUserRepository
let createUser: CreateUserUseCase

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    createUser = new CreateUserUseCase(fakeUserRepository)
  })

  it('should be able to create a new user', async () => {
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

    expect(user).toHaveProperty('id')
  })

  it('should not create a new user if passwords do not match', async () => {
    await expect(
      createUser.execute({
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        confirmPassword: 'senha124',
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
      }),
    ).rejects.toThrowError('Passwords do not match')
  })
})
