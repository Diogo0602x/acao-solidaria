import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { AuthenticatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/authenticate-principal-user/authenticate-principal-user-usecase'
import { CreatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/create-principal-user/create-principal-user-usecase'

let fakePrincipalUserRepository: FakePrincipalUserRepository
let authenticatePrincipalUser: AuthenticatePrincipalUserUseCase
let createPrincipalUser: CreatePrincipalUserUseCase

describe('AuthenticatePrincipalUser', () => {
  beforeEach(() => {
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    authenticatePrincipalUser = new AuthenticatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
    createPrincipalUser = new CreatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
  })

  it('should be able to authenticate a principal user by email', async () => {
    await createPrincipalUser.execute({
      name: 'Igreja de São Paulo',
      email: 'contact@igrejaspaulo.com.br',
      password: 'senha123',
      confirmPassword: 'senha123',
      role: 'church',
      cnpj: '12.345.678/0001-99',
      telephone: '(11) 1234-5678',
      cellphone: '(11) 91234-5678',
      address: {
        street: 'Rua da Consolação',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
        complement: 'Próximo ao metrô',
      },
    })

    const response = await authenticatePrincipalUser.execute({
      identifier: 'contact@igrejaspaulo.com.br',
      password: 'senha123',
    })

    expect(response).toHaveProperty('token')
  })

  it('should be able to authenticate a principal user by cnpj', async () => {
    await createPrincipalUser.execute({
      name: 'Igreja de São Paulo',
      email: 'contact@igrejaspaulo.com.br',
      password: 'senha123',
      confirmPassword: 'senha123',
      role: 'church',
      cnpj: '12.345.678/0001-99',
      telephone: '(11) 1234-5678',
      cellphone: '(11) 91234-5678',
      address: {
        street: 'Rua da Consolação',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
        complement: 'Próximo ao metrô',
      },
    })

    const response = await authenticatePrincipalUser.execute({
      identifier: '12.345.678/0001-99',
      password: 'senha123',
    })

    expect(response).toHaveProperty('token')
  })

  it('should not authenticate with invalid identifier', async () => {
    await expect(
      authenticatePrincipalUser.execute({
        identifier: 'invalid@example.com',
        password: 'senha123',
      }),
    ).rejects.toThrowError('Invalid identifier or password')
  })

  it('should not authenticate with incorrect password', async () => {
    await createPrincipalUser.execute({
      name: 'Igreja de São Paulo',
      email: 'contact@igrejaspaulo.com.br',
      password: 'senha123',
      confirmPassword: 'senha123',
      role: 'church',
      cnpj: '12.345.678/0001-99',
      telephone: '(11) 1234-5678',
      cellphone: '(11) 91234-5678',
      address: {
        street: 'Rua da Consolação',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
        complement: 'Próximo ao metrô',
      },
    })

    await expect(
      authenticatePrincipalUser.execute({
        identifier: 'contact@igrejaspaulo.com.br',
        password: 'wrongpassword',
      }),
    ).rejects.toThrowError('Invalid identifier or password')
  })
})
