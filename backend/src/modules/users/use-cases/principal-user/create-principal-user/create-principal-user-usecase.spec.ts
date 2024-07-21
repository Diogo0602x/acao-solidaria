import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { CreatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/create-principal-user/create-principal-user-usecase'

let fakePrincipalUserRepository: FakePrincipalUserRepository
let createPrincipalUser: CreatePrincipalUserUseCase

describe('CreatePrincipalUser', () => {
  beforeEach(() => {
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    createPrincipalUser = new CreatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
  })

  it('should be able to create a new principal user', async () => {
    const principalUser = await createPrincipalUser.execute({
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

    expect(principalUser).toHaveProperty('id')
  })

  it('should not create a new principal user if passwords do not match', async () => {
    await expect(
      createPrincipalUser.execute({
        name: 'Igreja de São Paulo',
        email: 'contact@igrejaspaulo.com.br',
        password: 'senha123',
        confirmPassword: 'senha124',
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
      }),
    ).rejects.toThrowError('Passwords do not match')
  })
})
