import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { ListFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/list-fundraising/list-fundraising-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let listFundraising: ListFundraisingUseCase

describe('ListFundraising', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    listFundraising = new ListFundraisingUseCase(fakeFundraisingRepository)
  })

  it('should be able to list all fundraisings', async () => {
    const fundraising1 = await fakeFundraisingRepository.create({
      name: 'Fundraising 1',
      quantity: 100,
      quantityAvailable: 100,
      price: 10,
      imageUrl: 'http://example.com/image1.jpg',
      userId: 'userId1',
    })

    const fundraising2 = await fakeFundraisingRepository.create({
      name: 'Fundraising 2',
      quantity: 200,
      quantityAvailable: 200,
      price: 20,
      imageUrl: 'http://example.com/image2.jpg',
      userId: 'userId2',
    })

    const fundraisings = await listFundraising.execute()

    expect(fundraisings).toEqual([fundraising1, fundraising2])
  })
})
