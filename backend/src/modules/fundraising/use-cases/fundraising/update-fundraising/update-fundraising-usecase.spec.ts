import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { UpdateFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/update-fundraising/update-fundraising-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let updateFundraising: UpdateFundraisingUseCase

describe('UpdateFundraising', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    updateFundraising = new UpdateFundraisingUseCase(fakeFundraisingRepository)
  })

  it('should be able to update an existing fundraising', async () => {
    const fundraising = await fakeFundraisingRepository.create({
      name: 'Fundraising 1',
      quantity: 100,
      quantityAvailable: 100,
      price: 10,
      imageUrl: 'http://example.com/image.jpg',
      userId: 'userId',
    })

    const updatedFundraising = await updateFundraising.execute(
      fundraising._id as string,
      {
        name: 'Updated Fundraising',
      },
    )

    expect(updatedFundraising?.name).toBe('Updated Fundraising')
  })

  it('should not update a non-existing fundraising', async () => {
    await expect(
      updateFundraising.execute('non-existing-id', {
        name: 'Updated Fundraising',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
