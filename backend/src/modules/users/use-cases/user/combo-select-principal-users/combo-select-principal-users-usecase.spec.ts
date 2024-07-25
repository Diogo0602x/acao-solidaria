import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { ComboSelectPrincipalUsersUseCase } from '@modules/users/use-cases/user/combo-select-principal-users/combo-select-principal-users-usecase'

let fakeUserRepository: FakeUserRepository
let comboSelectPrincipalUsers: ComboSelectPrincipalUsersUseCase

describe('ComboSelectPrincipalUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    comboSelectPrincipalUsers = new ComboSelectPrincipalUsersUseCase(
      fakeUserRepository,
    )
  })

  it('should be able to list all principal users with role church', async () => {
    await fakeUserRepository.create({
      name: 'Church User',
      email: 'church@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'church',
      cnpj: '12.345.678/0001-90',
      telephone: '(11) 1234-5678',
      address: {
        street: 'Street',
        neighborhood: 'Neighborhood',
        city: 'City',
        state: 'State',
        zipCode: '00000-000',
      },
    })

    const response = await comboSelectPrincipalUsers.execute()

    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Church User',
          value: expect.any(String),
        }),
      ]),
    )
  })

  it('should be able to list all principal users with role seminary', async () => {
    await fakeUserRepository.create({
      name: 'Seminary User',
      email: 'seminary@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'seminary',
      cnpj: '12.345.678/0001-90',
      telephone: '(11) 1234-5678',
      address: {
        street: 'Street',
        neighborhood: 'Neighborhood',
        city: 'City',
        state: 'State',
        zipCode: '00000-000',
      },
    })

    const response = await comboSelectPrincipalUsers.execute()

    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Seminary User',
          value: expect.any(String),
        }),
      ]),
    )
  })
})
