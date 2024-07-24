import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { ListFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/list-fundraising/list-fundraising-usecase'
import { CreateFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/create-fundraising/create-fundraising-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let fakePrincipalUserRepository: FakePrincipalUserRepository
let fakeUserRepository: FakeUserRepository
let listFundraising: ListFundraisingUseCase
let createFundraising: CreateFundraisingUseCase

describe('ListFundraising', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    fakeUserRepository = new FakeUserRepository()
    listFundraising = new ListFundraisingUseCase(fakeFundraisingRepository)
    createFundraising = new CreateFundraisingUseCase(
      fakeFundraisingRepository,
      fakePrincipalUserRepository,
      fakeUserRepository,
    )
  })

  it('should be able to list all fundraisings', async () => {
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

    await createFundraising.execute({
      name: 'Calendário',
      quantity: 1000,
      quantityAvailable: 1000,
      price: 10,
      imageUrl: 'http://example.com/imagem.jpg',
      userId: user.id,
    })

    const fundraisings = await listFundraising.execute()

    expect(fundraisings).toHaveLength(1)
  })
})
