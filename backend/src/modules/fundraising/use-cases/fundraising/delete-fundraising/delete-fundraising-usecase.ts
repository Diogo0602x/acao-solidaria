import { FundraisingRepository } from '@modules/fundraising/infra/mongoose/repositories/FundraisingRepository'

class DeleteFundraisingUseCase {
  public async execute(id: string): Promise<void> {
    const fundraisingRepository = new FundraisingRepository()
    await fundraisingRepository.delete(id)
  }
}

export { DeleteFundraisingUseCase }
