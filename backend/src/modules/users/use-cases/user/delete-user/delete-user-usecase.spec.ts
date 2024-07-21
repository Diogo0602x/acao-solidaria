import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { DeleteUserUseCase } from '@modules/users/use-cases/user/delete-user/delete-user-usecase'
import { CreateUserUseCase } from '@modules/users/use-cases/user/create-user/create-user-usecase'

let fakeUserRepository: FakeUserRepository
let deleteUser: DeleteUserUseCase
let createUser: CreateUserUseCase

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    deleteUser = new DeleteUserUseCase(fakeUserRepository)
    createUser = new CreateUserUseCase(fakeUserRepository)
  })

  it('should be able to delete a user', async () => {
    const user = await createUser.execute({
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

    await deleteUser.execute(user.id)

    const foundUser = await fakeUserRepository.findById(user.id)

    expect(foundUser).toBeNull()
  })
})
