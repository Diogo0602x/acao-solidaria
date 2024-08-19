import { Test, TestingModule } from '@nestjs/testing'
import { PurchaseFundraisingUseCase } from '@fundraising/use-cases/purchase-fundraising/purchase.fundraising.usecase'
import { PurchaseRepository } from '@fundraising/repositories/purchase.repository'
import { FundraisingRepository } from '@fundraising/repositories/fundraising.repository'
import { UsersRepository } from '@users/repositories/users.repository'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import { Purchase } from '@fundraising/entities/purchase.entity'
import { User } from '@users/entities/user.entity'

describe('PurchaseFundraisingUseCase', () => {
  let purchaseFundraisingUseCase: PurchaseFundraisingUseCase
  let purchaseRepository: PurchaseRepository
  let fundraisingRepository: FundraisingRepository
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseFundraisingUseCase,
        {
          provide: PurchaseRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: FundraisingRepository,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    purchaseFundraisingUseCase = module.get<PurchaseFundraisingUseCase>(
      PurchaseFundraisingUseCase,
    )
    purchaseRepository = module.get<PurchaseRepository>(PurchaseRepository)
    fundraisingRepository = module.get<FundraisingRepository>(
      FundraisingRepository,
    )
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should successfully complete a purchase', async () => {
    const user = new User()
    user.id = 'user-uuid'

    const fundraising = new Fundraising()
    fundraising.id = 'fundraising-uuid'
    fundraising.quantityAvailable = 100
    fundraising.price = 10.0

    const quantity = 10

    const purchase = new Purchase()
    purchase.user = user
    purchase.fundraising = fundraising
    purchase.quantity = quantity
    purchase.totalPrice = quantity * fundraising.price

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user)
    jest.spyOn(fundraisingRepository, 'findOne').mockResolvedValue(fundraising)
    jest.spyOn(purchaseRepository, 'save').mockResolvedValue(purchase)
    jest.spyOn(fundraisingRepository, 'save').mockResolvedValue(fundraising)

    const result = await purchaseFundraisingUseCase.execute(
      user.id,
      fundraising.id,
      quantity,
    )

    expect(result).toEqual(purchase)
    expect(fundraising.quantityAvailable).toBe(90)
    expect(purchaseRepository.save).toHaveBeenCalledWith(purchase)
    expect(fundraisingRepository.save).toHaveBeenCalledWith(fundraising)
  })

  it('should throw NotFoundException if user is not found', async () => {
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null)

    await expect(
      purchaseFundraisingUseCase.execute(
        'non-existent-user',
        'fundraising-uuid',
        10,
      ),
    ).rejects.toThrow(NotFoundException)
  })

  it('should throw NotFoundException if fundraising is not found', async () => {
    const user = new User()
    user.id = 'user-uuid'

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user)
    jest.spyOn(fundraisingRepository, 'findOne').mockResolvedValue(null)

    await expect(
      purchaseFundraisingUseCase.execute(
        user.id,
        'non-existent-fundraising',
        10,
      ),
    ).rejects.toThrow(NotFoundException)
  })

  it('should throw BadRequestException if quantity exceeds available amount', async () => {
    const user = new User()
    user.id = 'user-uuid'

    const fundraising = new Fundraising()
    fundraising.id = 'fundraising-uuid'
    fundraising.quantityAvailable = 5

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user)
    jest.spyOn(fundraisingRepository, 'findOne').mockResolvedValue(fundraising)

    await expect(
      purchaseFundraisingUseCase.execute(user.id, fundraising.id, 10),
    ).rejects.toThrow(BadRequestException)
  })

  it('should decrement the available quantity of the fundraising', async () => {
    const user = new User()
    user.id = 'user-uuid'

    const fundraising = new Fundraising()
    fundraising.id = 'fundraising-uuid'
    fundraising.quantityAvailable = 20
    fundraising.price = 10.0

    const quantity = 5

    const purchase = new Purchase()
    purchase.user = user
    purchase.fundraising = fundraising
    purchase.quantity = quantity
    purchase.totalPrice = quantity * fundraising.price

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user)
    jest.spyOn(fundraisingRepository, 'findOne').mockResolvedValue(fundraising)
    jest.spyOn(purchaseRepository, 'save').mockResolvedValue(purchase)
    jest.spyOn(fundraisingRepository, 'save').mockResolvedValue(fundraising)

    await purchaseFundraisingUseCase.execute(user.id, fundraising.id, quantity)

    expect(fundraising.quantityAvailable).toBe(15)
    expect(fundraisingRepository.save).toHaveBeenCalledWith(fundraising)
  })
})
