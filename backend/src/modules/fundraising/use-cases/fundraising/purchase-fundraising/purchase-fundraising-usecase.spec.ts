import { FakeFundraisingPurchaseRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-purchase-repository'
import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { ListFundraisingSalesByUserUseCase } from '@modules/fundraising/use-cases/fundraising/list-fundraising-sales-by-user/list-fundraising-sales-by-user-usecase'
import { CreateFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/create-fundraising/create-fundraising-usecase'
import { PurchaseFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/purchase-fundraising/purchase-fundraising-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let fakePrincipalUserRepository: FakePrincipalUserRepository
let fakeUserRepository: FakeUserRepository
let fakeFundraisingPurchaseRepository: FakeFundraisingPurchaseRepository
let listFundraisingSalesByUser: ListFundraisingSalesByUserUseCase
let createFundraising: CreateFundraisingUseCase
let purchaseFundraising: PurchaseFundraisingUseCase

describe('PurchaseFundraising', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    fakeUserRepository = new FakeUserRepository()
    fakeFundraisingPurchaseRepository = new FakeFundraisingPurchaseRepository()
    listFundraisingSalesByUser = new ListFundraisingSalesByUserUseCase(
      fakeFundraisingRepository,
      fakeFundraisingPurchaseRepository,
    )
    createFundraising = new CreateFundraisingUseCase(
      fakeFundraisingRepository,
      fakePrincipalUserRepository,
      fakeUserRepository,
    )
    purchaseFundraising = new PurchaseFundraisingUseCase(
      fakeFundraisingPurchaseRepository,
      fakeFundraisingRepository,
    )
  })

  it('should be able to list all fundraising sales by a user', async () => {
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
      quantity: 1000,
      quantityAvailable: 1000,
      price: 10,
      imageUrl: 'http://example.com/imagem.jpg',
      userId: user.id,
    })

    await purchaseFundraising.execute({
      fundraisingId: fundraising.id,
      userId: user.id,
      quantity: 10,
    })

    const sales = await listFundraisingSalesByUser.execute(user.id)

    expect(sales).toHaveLength(1)
    expect(sales[0].quantitySold).toBe(10)
    expect(sales[0].priceSold).toBe(100)
  })

  it('should throw an error if fundraising is not found', async () => {
    await expect(
      purchaseFundraising.execute({
        fundraisingId: 'non-existing-id',
        userId: 'user-id',
        quantity: 10,
      }),
    ).rejects.toThrow('Fundraising not found')
  })

  it('should throw an error if there is insufficient quantity available', async () => {
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
      quantity: 1000,
      quantityAvailable: 5,
      price: 10,
      imageUrl: 'http://example.com/imagem.jpg',
      userId: user.id,
    })

    await expect(
      purchaseFundraising.execute({
        fundraisingId: fundraising.id,
        userId: user.id,
        quantity: 10,
      }),
    ).rejects.toThrow('Insufficient quantity available')
  })
})
