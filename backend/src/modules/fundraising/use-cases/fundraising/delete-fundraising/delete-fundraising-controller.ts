import { Request, Response } from 'express'
import { DeleteFundraisingUseCase } from '@fundraising/use-cases'
import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'
class DeleteFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId } = request.params
    const fundraisingRepository = new FundraisingRepository()

    const deleteFundraisingUseCase = new DeleteFundraisingUseCase(
      fundraisingRepository,
    )

    await deleteFundraisingUseCase.execute(fundraisingId)

    return response.status(204).send()
  }
}

export { DeleteFundraisingController }
