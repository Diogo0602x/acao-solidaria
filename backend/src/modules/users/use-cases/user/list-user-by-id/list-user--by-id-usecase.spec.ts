import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { ListUserByIdUseCase } from '@modules/users/use-cases/user/list-user-by-id/list-user-by-id-usecase'

let fakeUserRepository: FakeUserRepository
let listUserById: ListUserByIdUseCase

describe('ListUserById', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    listUserById = new ListUserByIdUseCase(fakeUserRepository)
  })

  it('should be able to list a user by ID', async () => {
    const user = await fakeUserRepository.create({
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

    const foundUser = await listUserById.execute(user.id)

    expect(foundUser).toHaveProperty('id')
    expect(foundUser).toHaveProperty('email', 'joao.silva@example.com')
  })

  it('should return null if user is not found', async () => {
    const foundUser = await listUserById.execute('non-existing-id')

    expect(foundUser).toBeNull()
  })
})
