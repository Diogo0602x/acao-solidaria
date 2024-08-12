import {
  CreateImmediateChargeUseCase,
  AuthenticateTokenUseCase,
} from '@efi/use-cases/'
import axios from 'axios'
import fs from 'fs'

jest.mock('axios')
jest.mock('fs')
jest.mock('@efi/use-cases/AuthenticateTokenUseCase')

describe('CreateImmediateChargeUseCase', () => {
  let createImmediateChargeUseCase: CreateImmediateChargeUseCase
  let authenticateTokenUseCase: jest.Mocked<AuthenticateTokenUseCase>

  beforeEach(() => {
    createImmediateChargeUseCase = new CreateImmediateChargeUseCase()
    authenticateTokenUseCase =
      new AuthenticateTokenUseCase() as jest.Mocked<AuthenticateTokenUseCase>

    // Mock environment variables
    process.env.SANDBOX = 'true'
    process.env.CERTIFICATE_HOMOL = 'mock/homol.p12'
    process.env.API_HOMOL = 'https://mock-api.com'

    // Mock the certificate file
    ;(fs.readFileSync as jest.Mock).mockReturnValue(
      Buffer.from('mock-certificate'),
    )

    // Mock the access token retrieval
    authenticateTokenUseCase.execute.mockResolvedValue({
      access_token: 'mock_access_token',
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'cob.read cob.write',
    })
  })

  it('should create an immediate charge successfully', async () => {
    const mockChargeResponse = { txid: 'mock_txid', status: 'ACTIVE' }

    ;(axios.request as jest.Mock).mockResolvedValueOnce({
      data: mockChargeResponse,
    })

    const chargeResponse = await createImmediateChargeUseCase.execute({
      cpf: '12345678909',
      nome: 'Francisco da Silva',
      valor: '0.01',
      chave: '06725151132',
    })

    expect(chargeResponse).toEqual(mockChargeResponse)
    expect(axios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'https://mock-api.com/v2/cob',
      }),
    )
  })

  it('should throw an error if the charge creation fails', async () => {
    ;(axios.request as jest.Mock).mockRejectedValueOnce(
      new Error('Charge creation failed'),
    )

    await expect(
      createImmediateChargeUseCase.execute({
        cpf: '12345678909',
        nome: 'Francisco da Silva',
        valor: '0.01',
        chave: '06725151132',
      }),
    ).rejects.toThrow('Failed to create immediate charge')
  })
})
