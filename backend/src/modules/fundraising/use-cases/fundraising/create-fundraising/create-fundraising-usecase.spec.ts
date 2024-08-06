import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { CreateFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/create-fundraising/create-fundraising-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let fakeUserRepository: FakeUserRepository
let createFundraising: CreateFundraisingUseCase

describe('CreateFundraising', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    fakeUserRepository = new FakeUserRepository()
    createFundraising = new CreateFundraisingUseCase(
      fakeFundraisingRepository,
      fakeUserRepository,
    )
  })

  it('should be able to create a new fundraising', async () => {
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

    const fundraising = await createFundraising.execute({
      name: 'Calendário',
      quantity: 1000,
      quantityAvailable: 1000,
      price: 10,
      imageUrl: 'http://example.com/imagem.jpg',
      userId: user.id,
    })

    expect(fundraising).toHaveProperty('id')
  })

  it('should throw an error if user is not found', async () => {
    await expect(
      createFundraising.execute({
        name: 'Calendário',
        quantity: 1000,
        quantityAvailable: 1000,
        price: 10,
        imageUrl: 'http://example.com/imagem.jpg',
        userId: 'non-existing-id',
      }),
    ).rejects.toThrow('User not found')
  })
})
