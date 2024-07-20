import { Request, Response } from 'express'
import { DeleteFundraisingUseCase } from '@fundraising/use-cases'

class DeleteFundraisingController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { fundraisingId } = request.params

    const deleteFundraisingUseCase = new DeleteFundraisingUseCase()
    await deleteFundraisingUseCase.execute(fundraisingId)

    return response
      .status(200)
      .json({ message: 'Fundraising deleted successfully' })
  }
}

export { DeleteFundraisingController }
