import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { UpdatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/update-principal-user/update-principal-user-usecase'
import { CreatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/create-principal-user/create-principal-user-usecase'

let fakePrincipalUserRepository: FakePrincipalUserRepository
let updatePrincipalUser: UpdatePrincipalUserUseCase
let createPrincipalUser: CreatePrincipalUserUseCase

describe('UpdatePrincipalUser', () => {
  beforeEach(() => {
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    updatePrincipalUser = new UpdatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
    createPrincipalUser = new CreatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
  })

  it('should be able to update a principal user', async () => {
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

    const updatedPrincipalUser = await updatePrincipalUser.execute(
      principalUser.id,
      {
        name: 'Igreja de São José',
      },
    )

    expect(updatedPrincipalUser?.name).toBe('Igreja de São José')
  })

  it('should return null if principal user not found', async () => {
    const result = await updatePrincipalUser.execute('non-existing-id', {
      name: 'Igreja de São José',
    })

    expect(result).toBeNull()
  })
})
