// src/modules/users/use-cases/get-address-by-cep/get-address-by-cep-usecase.spec.ts
import axios from 'axios'
import {
  GetAddressByCepUseCase,
  ExternalAddressService,
} from '@users/use-cases'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('GetAddressByCepUseCase', () => {
  it('should return address data for a valid CEP', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        cep: '01000-000',
        logradouro: 'Rua Teste',
        bairro: 'Bairro Teste',
        localidade: 'Cidade Teste',
        uf: 'ST',
      },
    })

    const externalAddressService = new ExternalAddressService()
    const useCase = new GetAddressByCepUseCase(externalAddressService)
    const result = await useCase.execute('01000-000')

    expect(result).toEqual({
      cep: '01000-000',
      street: 'Rua Teste',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      state: 'ST',
    })
  })

  it('should throw an error if CEP is invalid', async () => {
    mockedAxios.get.mockResolvedValue({ data: { erro: true } })

    const externalAddressService = new ExternalAddressService()
    const useCase = new GetAddressByCepUseCase(externalAddressService)

    await expect(useCase.execute('00000000')).rejects.toThrow('Invalid CEP')
  })
})
