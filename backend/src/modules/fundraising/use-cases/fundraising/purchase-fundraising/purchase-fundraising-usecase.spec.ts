import { FakeFundraisingPurchaseRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-purchase-repository'
import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { PurchaseFundraisingUseCase } from '@modules/fundraising/use-cases/fundraising/purchase-fundraising/purchase-fundraising-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let fakeFundraisingPurchaseRepository: FakeFundraisingPurchaseRepository
let purchaseFundraising: PurchaseFundraisingUseCase

describe('PurchaseFundraising', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    fakeFundraisingPurchaseRepository = new FakeFundraisingPurchaseRepository()
    purchaseFundraising = new PurchaseFundraisingUseCase(
      fakeFundraisingRepository,
      fakeFundraisingPurchaseRepository,
    )
  })

  it('should be able to purchase fundraising', async () => {
    const fundraising = await fakeFundraisingRepository.create({
      name: 'Fundraising 1',
      quantity: 100,
      quantityAvailable: 100,
      price: 10,
      imageUrl: 'http://example.com/image.jpg',
      userId: 'userId',
    })

    const fundraisingPurchase = await purchaseFundraising.execute({
      fundraisingId: fundraising._id as string,
      userId: 'userId',
      quantity: 10,
    })

    expect(fundraisingPurchase).toHaveProperty('_id')
    expect(fundraisingPurchase.pricePurchased).toBe(10)
    expect(fundraisingPurchase.priceSold).toBe(10)
  })

  it('should not purchase fundraising if quantity available is not enough', async () => {
    const fundraising = await fakeFundraisingRepository.create({
      name: 'Fundraising 1',
      quantity: 100,
      quantityAvailable: 5,
      price: 10,
      imageUrl: 'http://example.com/image.jpg',
      userId: 'userId',
    })

    await expect(
      purchaseFundraising.execute({
        fundraisingId: fundraising._id as string,
        userId: 'userId',
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not purchase fundraising if fundraising not found', async () => {
    await expect(
      purchaseFundraising.execute({
        fundraisingId: 'non-existent-id',
        userId: 'userId',
        quantity: 10,
      }),
    ).rejects.toThrowError('Fundraising not found')
  })
})
