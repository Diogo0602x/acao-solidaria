import { FakeFundraisingPurchaseRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-purchase-repository'
import { ListFundraisingPurchasesByUserUseCase } from '@modules/fundraising/use-cases/fundraising/list-fundraising-purchases-by-user/list-fundraising-purchases-by-user-usecase'
import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { CreateFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/create-fundraising/create-fundraising-usecase'
import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'

let fakeFundraisingPurchaseRepository: FakeFundraisingPurchaseRepository
let listFundraisingPurchasesByUser: ListFundraisingPurchasesByUserUseCase
let fakeUserRepository: FakeUserRepository
let fakePrincipalUserRepository: FakePrincipalUserRepository
let fakeFundraisingRepository: FakeFundraisingRepository
let createFundraising: CreateFundraisingUseCase

describe('ListFundraisingPurchasesByUser', () => {
  beforeEach(() => {
    fakeFundraisingPurchaseRepository = new FakeFundraisingPurchaseRepository()
    listFundraisingPurchasesByUser = new ListFundraisingPurchasesByUserUseCase(
      fakeFundraisingPurchaseRepository,
    )
    fakeUserRepository = new FakeUserRepository()
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    fakeFundraisingRepository = new FakeFundraisingRepository()
    createFundraising = new CreateFundraisingUseCase(
      fakeFundraisingRepository,
      fakePrincipalUserRepository,
      fakeUserRepository,
    )
  })

  it('should be able to list fundraising purchases by user id', async () => {
    const principalUser = await fakePrincipalUserRepository.create({
      name: 'Igreja de São Paulo',
      email: 'contact@igrejaspaulo.com.br',
      password: 'senha123',
      confirmPassword: 'senha123',
      role: 'church',
      cnpj: '12.345.678/0001-99',
      telephone: '(11) 1234-5678',
      cellphone: '(11) 91234-5678',
      address: {
        street: 'Rua da Consolação',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
        complement: 'Próximo ao metrô',
      },
    })

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
      linkedTo: principalUser.id,
    })

    const fundraising = await createFundraising.execute({
      name: 'Calendário',
      quantityAvailable: 1000,
      imageUrl: 'http://example.com/imagem.jpg',
      userId: user.id,
    })

    const fundraisingPurchase = await fakeFundraisingPurchaseRepository.create({
      fundraising: fundraising.id,
      user: user.id,
      quantity: 5,
    })

    const purchases = await listFundraisingPurchasesByUser.execute(user.id)

    expect(purchases).toHaveLength(1)
    expect(purchases[0].id).toBe(fundraisingPurchase.id)
  })
})
