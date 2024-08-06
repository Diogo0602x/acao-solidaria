import { FakeFundraisingPurchaseRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-purchase-repository'
import { ListFundraisingPurchasesByUserUseCase } from '@modules/fundraising/use-cases/fundraising/list-fundraising-purchases-by-user/list-fundraising-purchases-by-user-usecase'

let fakeFundraisingPurchaseRepository: FakeFundraisingPurchaseRepository
let listFundraisingPurchasesByUser: ListFundraisingPurchasesByUserUseCase

describe('ListFundraisingPurchasesByUser', () => {
  beforeEach(() => {
    fakeFundraisingPurchaseRepository = new FakeFundraisingPurchaseRepository()
    listFundraisingPurchasesByUser = new ListFundraisingPurchasesByUserUseCase(
      fakeFundraisingPurchaseRepository,
    )
  })

  it('should be able to list fundraising purchases by user and group by fundraising', async () => {
    await fakeFundraisingPurchaseRepository.create({
      fundraising: 'fundraisingId1',
      user: 'userId',
      quantity: 1,
      pricePurchased: 10,
      priceSold: 15,
    })

    await fakeFundraisingPurchaseRepository.create({
      fundraising: 'fundraisingId1',
      user: 'userId',
      quantity: 2,
      pricePurchased: 20,
      priceSold: 25,
    })

    await fakeFundraisingPurchaseRepository.create({
      fundraising: 'fundraisingId2',
      user: 'userId',
      quantity: 3,
      pricePurchased: 30,
      priceSold: 35,
    })

    const purchases = await listFundraisingPurchasesByUser.execute('userId')

    expect(purchases).toEqual([
      expect.objectContaining({
        fundraising: 'fundraisingId1',
        user: 'userId',
        quantity: 3,
        pricePurchased: 30,
        priceSold: 40,
      }),
      expect.objectContaining({
        fundraising: 'fundraisingId2',
        user: 'userId',
        quantity: 3,
        pricePurchased: 30,
        priceSold: 35,
      }),
    ])
  })
})
