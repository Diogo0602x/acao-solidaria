import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { ListByIdPrincipalUserUseCase } from '@modules/users/use-cases/principal-user/list-by-id-principal-user/list-by-id-principal-user-usecase'
import { CreatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/create-principal-user/create-principal-user-usecase'

let fakePrincipalUserRepository: FakePrincipalUserRepository
let listByIdPrincipalUser: ListByIdPrincipalUserUseCase
let createPrincipalUser: CreatePrincipalUserUseCase

describe('ListByIdPrincipalUser', () => {
  beforeEach(() => {
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    listByIdPrincipalUser = new ListByIdPrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
    createPrincipalUser = new CreatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
  })

  it('should be able to list a principal user by id', async () => {
    const principalUser = await createPrincipalUser.execute({
      name: 'Igreja de São Paulo',
      email: 'contact@igrejaspaulo.com.br',
      password: 'senha123',
      confirmPassword: 'senha123',
      role: 'church',
      cnpj: '12.345.678/0001-99',
      telephone: '(11) 1234-5678',
      address: {
        street: 'Rua da Consolação',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
      },
    })

    const foundPrincipalUser = await listByIdPrincipalUser.execute(
      principalUser.id,
    )

    expect(foundPrincipalUser?.id).toBe(principalUser.id)
  })
})
