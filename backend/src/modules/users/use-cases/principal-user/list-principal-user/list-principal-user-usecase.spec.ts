import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { ListPrincipalUserUseCase } from '@modules/users/use-cases/principal-user/list-principal-user/list-principal-user-usecase'
import { CreatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/create-principal-user/create-principal-user-usecase'

let fakePrincipalUserRepository: FakePrincipalUserRepository
let listPrincipalUser: ListPrincipalUserUseCase
let createPrincipalUser: CreatePrincipalUserUseCase

describe('ListPrincipalUser', () => {
  beforeEach(() => {
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    listPrincipalUser = new ListPrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
    createPrincipalUser = new CreatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
  })

  it('should be able to list all principal users', async () => {
    await createPrincipalUser.execute({
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

    const principalUsers = await listPrincipalUser.execute()

    expect(principalUsers).toHaveLength(1)
  })
})
