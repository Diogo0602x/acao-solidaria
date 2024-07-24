import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { ComboSelectPrincipalUsersUseCase } from '@modules/users/use-cases/principal-user/combo-select-principal-users/combo-select-principal-users-usecase'
import { CreatePrincipalUserUseCase } from '@modules/users/use-cases/principal-user/create-principal-user/create-principal-user-usecase'

let fakePrincipalUserRepository: FakePrincipalUserRepository
let comboSelectPrincipalUsers: ComboSelectPrincipalUsersUseCase
let createPrincipalUser: CreatePrincipalUserUseCase

describe('ComboSelectPrincipalUsers', () => {
  beforeEach(() => {
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    comboSelectPrincipalUsers = new ComboSelectPrincipalUsersUseCase(
      fakePrincipalUserRepository,
    )
    createPrincipalUser = new CreatePrincipalUserUseCase(
      fakePrincipalUserRepository,
    )
  })

  it('should be able to list all principal users for combo select', async () => {
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

    const principalUsers = await comboSelectPrincipalUsers.execute()

    expect(principalUsers).toHaveLength(1)
    expect(principalUsers[0]).toHaveProperty('label')
    expect(principalUsers[0]).toHaveProperty('value')
  })
})
