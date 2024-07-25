import { FakeFundraisingRepository } from '@modules/fundraising/repositories/fakes/fake-fundraising-repository'
import { ListFundraisingSalesByUserUseCase } from '@modules/fundraising/use-cases/fundraising/list-fundraising-sales-by-user/list-fundraising-sales-by-user-usecase'

let fakeFundraisingRepository: FakeFundraisingRepository
let listFundraisingSalesByUser: ListFundraisingSalesByUserUseCase

describe('ListFundraisingSalesByUser', () => {
  beforeEach(() => {
    fakeFundraisingRepository = new FakeFundraisingRepository()
    listFundraisingSalesByUser = new ListFundraisingSalesByUserUseCase(
      fakeFundraisingRepository,
    )
  })

  it('should be able to list fundraising sales by user', async () => {
    await fakeFundraisingRepository.create({
      name: 'Fundraising 1',
      quantity: 100,
      quantityAvailable: 100,
      price: 10,
      imageUrl: 'http://example.com/image1.jpg',
      userId: 'userId',
    })

    await fakeFundraisingRepository.create({
      name: 'Fundraising 2',
      quantity: 200,
      quantityAvailable: 200,
      price: 20,
      imageUrl: 'http://example.com/image2.jpg',
      userId: 'userId',
    })

    const sales = await listFundraisingSalesByUser.execute('userId')

    expect(sales).toEqual([
      expect.objectContaining({
        name: 'Fundraising 1',
        quantity: 100,
        quantityAvailable: 100,
        price: 10,
        imageUrl: 'http://example.com/image1.jpg',
        user: 'userId',
      }),
      expect.objectContaining({
        name: 'Fundraising 2',
        quantity: 200,
        quantityAvailable: 200,
        price: 20,
        imageUrl: 'http://example.com/image2.jpg',
        user: 'userId',
      }),
    ])
  })
})
