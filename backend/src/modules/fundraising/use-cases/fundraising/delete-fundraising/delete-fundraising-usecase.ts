import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'

class DeleteFundraisingUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(id: string): Promise<void> {
    await this.fundraisingRepository.delete(id)
  }
}

export { DeleteFundraisingUseCase }
