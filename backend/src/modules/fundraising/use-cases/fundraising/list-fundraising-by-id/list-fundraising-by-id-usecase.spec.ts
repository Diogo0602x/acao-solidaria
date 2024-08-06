import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { ListFundraisingByIdUseCase } from '@modules/fundraising/use-cases/fundraising/list-fundraising-by-id/list-fundraising-by-id-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let listFundraisingById: ListFundraisingByIdUseCase

describe('ListFundraisingById', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    listFundraisingById = new ListFundraisingByIdUseCase(
      fakeFundraisingRepository,
    )
  })

  it('should be able to list a fundraising by ID', async () => {
    const createdFundraising = await fakeFundraisingRepository.create({
      name: 'Raffle',
      quantity: 100,
      quantityAvailable: 100,
      price: 10,
      imageUrl: 'http://example.com/image.jpg',
      userId: 'user_id',
    })

    const fundraising = await listFundraisingById.execute(
      createdFundraising._id as string,
    )

    expect(fundraising).toHaveProperty('_id')
    expect(fundraising?.name).toBe('Raffle')
  })

  it('should not be able to list a non-existing fundraising', async () => {
    await expect(
      listFundraisingById.execute('non_existing_id'),
    ).rejects.toBeInstanceOf(Error)
  })
})
