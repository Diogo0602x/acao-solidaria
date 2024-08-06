import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { CreateUserUseCase } from '@modules/users/use-cases/user/create-user/create-user-usecase'

let fakeUserRepository: FakeUserRepository
let createUser: CreateUserUseCase

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    createUser = new CreateUserUseCase(fakeUserRepository)
  })

  it('should be able to create a new user', async () => {
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

    expect(user).toHaveProperty('id')
  })

  it('should not create a new user if passwords do not match', async () => {
    await expect(
      createUser.execute({
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        confirmPassword: 'senha124',
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
      }),
    ).rejects.toThrow('Passwords do not match')
  })

  it('should throw an error if CNPJ is not provided for principal users', async () => {
    await expect(
      createUser.execute({
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        confirmPassword: 'senha123',
        role: 'church',
        telephone: '(11) 1234-5678',
        address: {
          street: 'Rua da Consolação',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01000-000',
        },
      }),
    ).rejects.toThrow('CNPJ is required for principal users')
  })

  it('should throw an error if LinkedTo is not provided for regular users', async () => {
    await expect(
      createUser.execute({
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
      }),
    ).rejects.toThrow('LinkedTo is required for regular users')
  })

  it('should throw an error if CPF is not provided for regular users', async () => {
    await expect(
      createUser.execute({
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        confirmPassword: 'senha123',
        role: 'priest',
        linkedTo: 'principalUserId',
        telephone: '(11) 1234-5678',
        address: {
          street: 'Rua da Consolação',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01000-000',
        },
      }),
    ).rejects.toThrow('CPF is required for regular users')
  })
})
