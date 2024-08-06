import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { ListUserUseCase } from '@modules/users/use-cases/user/list-user/list-user-usecase'

let fakeUserRepository: FakeUserRepository
let listUser: ListUserUseCase

describe('ListUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    listUser = new ListUserUseCase(fakeUserRepository)
  })

  it('should be able to list all users', async () => {
    await fakeUserRepository.create({
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

    const users = await listUser.execute()

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'joao.silva@example.com',
        }),
      ]),
    )
  })
})
