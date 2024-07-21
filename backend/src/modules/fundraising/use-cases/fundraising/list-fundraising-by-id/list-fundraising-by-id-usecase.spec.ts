import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { ListFundraisingByIdUseCase } from '@modules/fundraising/use-cases/fundraising/list-fundraising-by-id/list-fundraising-by-id-usecase'
import { CreateFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/create-fundraising/create-fundraising-usecase'
import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'

let fakeFundraisingRepository: FakeFundraisingRepository
let listFundraisingById: ListFundraisingByIdUseCase
let createFundraising: CreateFundraisingUseCase
let fakePrincipalUserRepository: FakePrincipalUserRepository
let fakeUserRepository: FakeUserRepository

describe('ListFundraisingById', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    fakeUserRepository = new FakeUserRepository()
    listFundraisingById = new ListFundraisingByIdUseCase(
      fakeFundraisingRepository,
    )
    createFundraising = new CreateFundraisingUseCase(
      fakeFundraisingRepository,
      fakePrincipalUserRepository,
      fakeUserRepository,
    )
  })

  it('should be able to list a fundraising by id', async () => {
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

    const foundFundraising = await listFundraisingById.execute(fundraising.id)

    expect(foundFundraising).toHaveProperty('id')
  })

  it('should return null if fundraising not found', async () => {
    const result = await listFundraisingById.execute('non-existing-id')

    expect(result).toBeNull()
  })
})
