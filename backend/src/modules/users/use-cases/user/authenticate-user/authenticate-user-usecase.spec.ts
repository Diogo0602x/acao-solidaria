import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { AuthenticateUserUseCase } from '@modules/users/use-cases/user/authenticate-user/authenticate-user-usecase'
import { CreateUserUseCase } from '@modules/users/use-cases/user/create-user/create-user-usecase'

let fakeUserRepository: FakeUserRepository
let authenticateUser: AuthenticateUserUseCase
let createUser: CreateUserUseCase

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    authenticateUser = new AuthenticateUserUseCase(fakeUserRepository)
    createUser = new CreateUserUseCase(fakeUserRepository)
  })

  it('should be able to authenticate a user by email', async () => {
    await createUser.execute({
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

    const response = await authenticateUser.execute({
      identifier: 'joao.silva@example.com',
      password: 'senha123',
    })

    expect(response).toHaveProperty('token')
  })

  it('should be able to authenticate a user by cpf', async () => {
    await createUser.execute({
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

    const response = await authenticateUser.execute({
      identifier: '123.456.789-00',
      password: 'senha123',
    })

    expect(response).toHaveProperty('token')
  })

  it('should not authenticate with invalid identifier', async () => {
    await expect(
      authenticateUser.execute({
        identifier: 'invalid@example.com',
        password: 'senha123',
      }),
    ).rejects.toThrowError('Invalid identifier or password')
  })

  it('should not authenticate with incorrect password', async () => {
    await createUser.execute({
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

    await expect(
      authenticateUser.execute({
        identifier: 'joao.silva@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrowError('Invalid identifier or password')
  })
})
