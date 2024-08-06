import { Request, Response } from 'express'
import { ListFundraisingByIdUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class ListFundraisingByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId } = request.params
    const fundraisingRepository = new FundraisingRepository()

    const listFundraisingByIdUseCase = new ListFundraisingByIdUseCase(
      fundraisingRepository,
    )

    try {
      const fundraising =
        await listFundraisingByIdUseCase.execute(fundraisingId)
      return response.status(200).json(fundraising)
    } catch (error) {
      return response.status(404).json({ message: (error as Error).message })
    }
  }
}

export { ListFundraisingByIdController }
