import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { FakePrincipalUserRepository } from '@modules/users/repositories/fakes/fake-principal-user-repository'
import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'
import { UpdateFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/update-fundraising/update-fundraising-usecase'
import { CreateFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/create-fundraising/create-fundraising-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let fakePrincipalUserRepository: FakePrincipalUserRepository
let fakeUserRepository: FakeUserRepository
let updateFundraising: UpdateFundraisingUseCase
let createFundraising: CreateFundraisingUseCase

describe('UpdateFundraising', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    fakePrincipalUserRepository = new FakePrincipalUserRepository()
    fakeUserRepository = new FakeUserRepository()
    updateFundraising = new UpdateFundraisingUseCase(fakeFundraisingRepository)
    createFundraising = new CreateFundraisingUseCase(
      fakeFundraisingRepository,
      fakePrincipalUserRepository,
      fakeUserRepository,
    )
  })

  it('should be able to update a fundraising', async () => {
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

    const updatedFundraising = await updateFundraising.execute(fundraising.id, {
      name: 'Calendário Atualizado',
    })

    expect(updatedFundraising).toHaveProperty('id')
    expect(updatedFundraising?.name).toBe('Calendário Atualizado')
  })

  it('should return null if fundraising not found', async () => {
    const result = await updateFundraising.execute('non-existing-id', {
      name: 'Calendário Atualizado',
    })

    expect(result).toBeNull()
  })
})
