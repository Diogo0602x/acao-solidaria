import https from 'https'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

interface IAuthenticateTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

class AuthenticateTokenUseCase {
  public async execute(): Promise<IAuthenticateTokenResponse> {
    const certificatePath =
      process.env.APP_ENV === 'dev'
        ? process.env.CERTIFICATE_HOMOL
        : process.env.CERTIFICATE_PROD
    const certificado = fs.readFileSync(certificatePath!)

    const client_id =
      process.env.APP_ENV === 'dev'
        ? process.env.CLIENT_ID_HOMOL
        : process.env.CLIENT_ID_PROD
    const client_secret =
      process.env.APP_ENV === 'dev'
        ? process.env.CHAVE_SECRET_HOMOL
        : process.env.CHAVE_SECRET_PROD

    const data = JSON.stringify({ grant_type: 'client_credentials' })
    const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

    const agent = new https.Agent({
      pfx: certificado,
    })

    const apiURL =
      process.env.APP_ENV === 'dev'
        ? process.env.API_HOMOL
        : process.env.API_PROD

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${apiURL}/oauth/token`,
      headers: {
        Authorization: 'Basic ' + auth,
        'Content-Type': 'application/json',
      },
      httpsAgent: agent,
      data,
    }

    try {
      const response: AxiosResponse<IAuthenticateTokenResponse> =
        await axios(config)
      return response.data
    } catch (error) {
      throw new Error('Failed to authenticate token')
    }
  }
}

export { AuthenticateTokenUseCase }
