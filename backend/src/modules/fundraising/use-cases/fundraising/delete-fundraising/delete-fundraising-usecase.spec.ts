import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { DeleteFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/delete-fundraising/delete-fundraising-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let deleteFundraising: DeleteFundraisingUseCase

describe('DeleteFundraising', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    deleteFundraising = new DeleteFundraisingUseCase(fakeFundraisingRepository)
  })

  it('should be able to delete an existing fundraising', async () => {
    const fundraising = await fakeFundraisingRepository.create({
      name: 'Fundraising 1',
      quantity: 100,
      quantityAvailable: 100,
      price: 10,
      imageUrl: 'http://example.com/image.jpg',
      userId: 'userId',
    })

    await deleteFundraising.execute(fundraising._id as string as string)

    const foundFundraising = await fakeFundraisingRepository.findById(
      fundraising._id as string,
    )
    expect(foundFundraising).toBeNull()
  })

  it('should not delete a non-existing fundraising', async () => {
    await expect(
      deleteFundraising.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(Error)
  })
})
