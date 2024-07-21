import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { DeletePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/delete-principal-user/delete-principal-user-usecase'
import { CreatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/create-principal-user/create-principal-user-usecase'

let fakePrincipalUserRepository: FakePrincipalUserRepository
let deletePrincipalUser: DeletePrincipalUserUseCase
let createPrincipalUser: CreatePrincipalUserUseCase

describe('DeletePrincipalUser', () => {
  beforeEach(() => {
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    deletePrincipalUser = new DeletePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
    createPrincipalUser = new CreatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
  })

  it('should be able to delete a principal user', async () => {
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

    await deletePrincipalUser.execute(principalUser.id)

    const foundPrincipalUser = await fakePrincipalUserRepository.findById(
      principalUser.id,
    )

    expect(foundPrincipalUser).toBeNull()
  })
})
