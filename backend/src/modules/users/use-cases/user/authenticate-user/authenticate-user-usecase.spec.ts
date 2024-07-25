import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { AuthenticateUserUseCase } from '@modules/users/use-cases/user/authenticate-user/authenticate-user-usecase'
import { hash } from 'bcryptjs'

let fakeUserRepository: FakeUserRepository
let authenticateUser: AuthenticateUserUseCase

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    authenticateUser = new AuthenticateUserUseCase(fakeUserRepository)
  })

  it('should be able to authenticate a user by email', async () => {
    await fakeUserRepository.create({
      name: 'João Silva',
      email: 'joao.silva@example.com',
      password: await hash('senha123', 8),
      confirmPassword: await hash('senha123', 8),
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
    expect(response).toHaveProperty('user')
  })

  it('should be able to authenticate a user by cpf/cnpj', async () => {
    await fakeUserRepository.create({
      name: 'João Silva',
      email: 'joao.silva@example.com',
      password: await hash('senha123', 8),
      confirmPassword: await hash('senha123', 8),
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
    expect(response).toHaveProperty('user')
  })

  it('should not authenticate with invalid credentials', async () => {
    await expect(
      authenticateUser.execute({
        identifier: 'invalid@example.com',
        password: 'invalidpassword',
      }),
    ).rejects.toThrow('Invalid identifier or password')
  })

  it('should not authenticate with a valid identifier but invalid password', async () => {
    await fakeUserRepository.create({
      name: 'João Silva',
      email: 'joao.silva@example.com',
      password: await hash('senha123', 8),
      confirmPassword: await hash('senha123', 8),
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
    ).rejects.toThrow('Invalid identifier or password')
  })
})
