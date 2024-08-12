import https from 'https'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import fs from 'fs'
import dotenv from 'dotenv'
import { AuthenticateTokenUseCase } from '@efi/use-cases'

dotenv.config()

interface ICalendario {
  expiracao: number
}

interface IDevedor {
  cpf: string
  nome: string
}

interface IValor {
  original: string
}

interface ICreateImmediateChargeInput {
  cpf: string
  nome: string
  valor: string
  chave: string
}

interface IImmediateChargeRequest {
  calendario: ICalendario
  devedor: IDevedor
  valor: IValor
  chave: string
}

interface IImmediateChargeResponse {
  txid: string
  status: string
  location: string
  devedor: IDevedor
  calendario: ICalendario
  valor: IValor
  chave: string
}

class CreateImmediateChargeUseCase {
  public async execute({
    cpf,
    nome,
    valor,
    chave,
  }: ICreateImmediateChargeInput): Promise<IImmediateChargeResponse> {
    const authenticateTokenUseCase = new AuthenticateTokenUseCase()
    const tokenResponse = await authenticateTokenUseCase.execute()

    const accessToken = tokenResponse.access_token
    const tokenType = tokenResponse.token_type

    const certificatePath =
      process.env.APP_ENV === 'dev'
        ? process.env.CERTIFICATE_HOMOL
        : process.env.CERTIFICATE_PROD
    const certificado = fs.readFileSync(certificatePath!)

    const agent = new https.Agent({
      pfx: certificado,
      passphrase: '',
    })

    const apiURL =
      process.env.APP_ENV === 'dev'
        ? process.env.API_HOMOL
        : process.env.API_PROD

    const data: IImmediateChargeRequest = {
      calendario: { expiracao: 3600 },
      devedor: { cpf, nome },
      valor: { original: valor },
      chave,
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${apiURL}/v2/cob`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: agent,
      data,
    }

    try {
      const response: AxiosResponse<IImmediateChargeResponse> =
        await axios(config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error creating immediate charge:',
          JSON.stringify(error.response?.data, null, 2) || error.message,
        )
      } else {
        console.error('Error creating immediate charge:', error)
      }
      throw new Error('Failed to create immediate charge')
    }
  }
}

export { CreateImmediateChargeUseCase }
