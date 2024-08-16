import { Test, TestingModule } from '@nestjs/testing'
import { CreateFundraisingUseCase } from '@fundraising/use-cases/create-fundraising/create.fundraising.usecase'
import { FundraisingRepository } from '@fundraising/repositories/fundraising.repository'
import { CreateFundraisingDto } from '@fundraising/dtos/create.fundraising.dto'
import { User } from '@users/entities/user.entity'
import { UsersRepository } from '@users/repositories/users.repository'
import { NotFoundException } from '@nestjs/common'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import * as fs from 'fs'
import * as path from 'path'

jest.mock('fs')
jest.mock('path', () => {
  const originalPath = jest.requireActual('path')
  return {
    ...originalPath,
    resolve: jest.fn((...args) => originalPath.resolve(...args)),
    join: jest.fn((...args) => originalPath.join(...args)),
  }
})

describe('CreateFundraisingUseCase', () => {
  let createFundraisingUseCase: CreateFundraisingUseCase
  let fundraisingRepository: FundraisingRepository
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFundraisingUseCase,
        {
          provide: FundraisingRepository,
          useValue: {
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

    createFundraisingUseCase = module.get<CreateFundraisingUseCase>(
      CreateFundraisingUseCase,
    )
    fundraisingRepository = module.get<FundraisingRepository>(
      FundraisingRepository,
    )
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should use user.cnpj and user.pixKeyChaveAleatoria if linkedUser cnpj and pixKeyChaveAleatoria are undefined', async () => {
    const createFundraisingDto: CreateFundraisingDto = {
      name: 'Fundraising Event',
      quantity: 100,
      quantityAvailable: 100,
      price: 10.0,
      image: 'image-data',
      userId: 'user-uuid',
    }

    const user = new User()
    user.id = 'user-uuid'
    user.cpf = '123.456.789-00'
    user.cnpj = '12.345.678/0001-99'
    user.pixKeyChaveAleatoria = 'user-random-key'
    user.linkedTo = 'linked-user-id'

    const linkedUser = new User()
    linkedUser.id = 'linked-user-id'
    linkedUser.cnpj = undefined // Undefined cnpj
    linkedUser.pixKeyChaveAleatoria = undefined // Undefined pixKeyChaveAleatoria

    const fundraising = new Fundraising()
    fundraising.id = 'fundraising-uuid'
    fundraising.name = createFundraisingDto.name
    fundraising.quantity = createFundraisingDto.quantity
    fundraising.quantityAvailable = createFundraisingDto.quantityAvailable
    fundraising.price = createFundraisingDto.price
    fundraising.pixKeyCpf = user.cpf
    fundraising.pixKeyCnpj = user.cnpj // Should use user.cnpj
    fundraising.pixKeyChaveAleatoria = user.pixKeyChaveAleatoria // Should use user.pixKeyChaveAleatoria
    fundraising.user = Promise.resolve(user)

    const findOneMock = usersRepository.findOne as jest.MockedFunction<
      typeof usersRepository.findOne
    >
    findOneMock.mockResolvedValueOnce(user)
    findOneMock.mockResolvedValueOnce(linkedUser)

    const saveMock = fundraisingRepository.save as jest.MockedFunction<
      typeof fundraisingRepository.save
    >
    saveMock.mockResolvedValue(fundraising)

    const writeFileSyncMock = fs.writeFileSync as jest.Mock
    const imagePath = path.resolve(
      __dirname,
      `../../users/${user.id}/fundraising/fundraising-uuid-image.jpg`,
    )
    writeFileSyncMock.mockImplementation(() => undefined)

    const result = await createFundraisingUseCase.execute(createFundraisingDto)

    expect(saveMock).toHaveBeenCalledTimes(2)
    expect(saveMock).toHaveBeenCalledWith(
      expect.objectContaining({
        pixKeyCnpj: user.cnpj,
        pixKeyChaveAleatoria: user.pixKeyChaveAleatoria,
        image: imagePath,
      }),
    )

    expect(writeFileSyncMock).toHaveBeenCalledWith(imagePath, 'image-data')

    expect(result).toEqual(fundraising)
  })

  it('should cover the else branch when user.linkedTo is not set', async () => {
    const createFundraisingDto: CreateFundraisingDto = {
      name: 'Fundraising Event',
      quantity: 100,
      quantityAvailable: 100,
      price: 10.0,
      image: 'image-data',
      userId: 'user-uuid',
    }

    const user = new User()
    user.id = 'user-uuid'
    user.cpf = '123.456.789-00'
    user.cnpj = '12.345.678/0001-99'
    user.pixKeyChaveAleatoria = 'user-random-key'
    user.linkedTo = undefined // No linked user

    const fundraising = new Fundraising()
    fundraising.id = 'fundraising-uuid'
    fundraising.name = createFundraisingDto.name
    fundraising.quantity = createFundraisingDto.quantity
    fundraising.quantityAvailable = createFundraisingDto.quantityAvailable
    fundraising.price = createFundraisingDto.price
    fundraising.pixKeyCpf = user.cpf
    fundraising.pixKeyCnpj = user.cnpj
    fundraising.pixKeyChaveAleatoria = user.pixKeyChaveAleatoria
    fundraising.user = Promise.resolve(user)

    const findOneMock = usersRepository.findOne as jest.MockedFunction<
      typeof usersRepository.findOne
    >
    findOneMock.mockResolvedValue(user)

    const saveMock = fundraisingRepository.save as jest.MockedFunction<
      typeof fundraisingRepository.save
    >
    saveMock.mockResolvedValue(fundraising)

    const writeFileSyncMock = fs.writeFileSync as jest.Mock
    const imagePath = path.resolve(
      __dirname,
      `../../users/${user.id}/fundraising/fundraising-uuid-image.jpg`,
    )
    writeFileSyncMock.mockImplementation(() => undefined)

    const result = await createFundraisingUseCase.execute(createFundraisingDto)

    expect(saveMock).toHaveBeenCalledTimes(2)
    expect(saveMock).toHaveBeenCalledWith(
      expect.objectContaining({
        pixKeyCpf: user.cpf,
        pixKeyCnpj: user.cnpj,
        pixKeyChaveAleatoria: user.pixKeyChaveAleatoria,
        image: imagePath,
      }),
    )

    expect(writeFileSyncMock).toHaveBeenCalledWith(imagePath, 'image-data')

    expect(result).toEqual(fundraising)
  })

  it('should throw NotFoundException if user is not found', async () => {
    const createFundraisingDto: CreateFundraisingDto = {
      name: 'Fundraising Event',
      quantity: 100,
      quantityAvailable: 100,
      price: 10.0,
      image: 'image.jpg',
      userId: 'user-uuid',
    }

    ;(usersRepository.findOne as jest.Mock).mockResolvedValue(null)

    await expect(
      createFundraisingUseCase.execute(createFundraisingDto),
    ).rejects.toThrow(NotFoundException)
  })

  it('should throw NotFoundException if linkedUser is not found', async () => {
    const createFundraisingDto: CreateFundraisingDto = {
      name: 'Fundraising Event',
      quantity: 100,
      quantityAvailable: 100,
      price: 10.0,
      image: 'image-data',
      userId: 'user-uuid',
    }

    const user = new User()
    user.id = 'user-uuid'
    user.cpf = '123.456.789-00'
    user.cnpj = '12.345.678/0001-99'
    user.pixKeyChaveAleatoria = 'user-random-key'
    user.linkedTo = 'linked-user-id'

    const findOneMock = usersRepository.findOne as jest.MockedFunction<
      typeof usersRepository.findOne
    >
    findOneMock.mockResolvedValueOnce(user)
    findOneMock.mockResolvedValueOnce(null) // Simulate linkedUser not found

    await expect(
      createFundraisingUseCase.execute(createFundraisingDto),
    ).rejects.toThrow(NotFoundException)
  })
})
