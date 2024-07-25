import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { UpdateUserUseCase } from '@modules/users/use-cases/user/update-user/update-user-usecase'

let fakeUserRepository: FakeUserRepository
let updateUser: UpdateUserUseCase

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    updateUser = new UpdateUserUseCase(fakeUserRepository)
  })

  it('should be able to update a user', async () => {
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

    const updatedUser = await updateUser.execute(user.id, {
      name: 'João Updated',
    })

    expect(updatedUser).toHaveProperty('name', 'João Updated')
  })

  it('should not update the user if passwords do not match', async () => {
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

    await expect(
      updateUser.execute(user.id, {
        password: 'newpassword123',
        confirmPassword: 'differentpassword123',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should update the user password', async () => {
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

    const updatedUser = await updateUser.execute(user.id, {
      password: 'newpassword123',
      confirmPassword: 'newpassword123',
    })

    expect(updatedUser).toHaveProperty('password')
  })
})
