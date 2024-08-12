import { AuthenticateTokenUseCase } from '@efi/use-cases'
import axios from 'axios'
import fs from 'fs'

// Properly mock axios using Jest
jest.mock('axios')
jest.mock('fs')

describe('AuthenticateTokenUseCase', () => {
  let authenticateTokenUseCase: AuthenticateTokenUseCase

  beforeEach(() => {
    authenticateTokenUseCase = new AuthenticateTokenUseCase()

    // Mock environment variables
    process.env.SANDBOX = 'true'
    process.env.CERTIFICATE_HOMOL = 'mock/homol.p12'
    process.env.CLIENT_ID_HOMOL = 'mock_client_id'
    process.env.CHAVE_SECRET_HOMOL = 'mock_secret'
    process.env.API_HOMOL = 'https://mock-api.com'

    // Mock the certificate file
    ;(fs.readFileSync as jest.Mock).mockReturnValue(
      Buffer.from('mock-certificate'),
    )
  })

  it('should return the access token when authentication is successful', async () => {
    const mockAccessToken = 'mock_access_token'

    // Mock axios response
    ;(axios.request as jest.Mock).mockResolvedValueOnce({
      data: { access_token: mockAccessToken },
    })

    const accessToken = await authenticateTokenUseCase.execute()

    expect(accessToken).toBe(mockAccessToken)
    expect(axios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'https://mock-api.com/oauth/token',
      }),
    )
  })

  it('should throw an error when authentication fails', async () => {
    // Mock axios to simulate a failed request
    ;(axios.request as jest.Mock).mockRejectedValueOnce(
      new Error('Authentication failed'),
    )

    await expect(authenticateTokenUseCase.execute()).rejects.toThrow(
      'Failed to authenticate token',
    )
  })
})
