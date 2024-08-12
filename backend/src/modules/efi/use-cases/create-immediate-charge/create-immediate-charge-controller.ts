import { Request, Response } from 'express'
import { CreateImmediateChargeUseCase } from '@efi/use-cases'

class CreateImmediateChargeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, nome, valor, chave } = request.body.devedor
      ? {
          cpf: request.body.devedor.cpf,
          nome: request.body.devedor.nome,
          valor: request.body.valor.original,
          chave: request.body.chave,
        }
      : {
          cpf: undefined,
          nome: undefined,
          valor: undefined,
          chave: undefined,
        }

    const createImmediateChargeUseCase = new CreateImmediateChargeUseCase()

    try {
      const charge = await createImmediateChargeUseCase.execute({
        cpf,
        nome,
        valor,
        chave,
      })

      return response.status(200).json(charge)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { CreateImmediateChargeController }
