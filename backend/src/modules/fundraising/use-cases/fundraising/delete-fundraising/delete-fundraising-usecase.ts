import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'

class DeleteFundraisingUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(fundraisingId: string): Promise<void> {
    const fundraising = await this.fundraisingRepository.findById(fundraisingId)
    if (!fundraising) {
      throw new Error('Fundraising not found')
    }
    await this.fundraisingRepository.delete(fundraisingId)
  }
}

export { DeleteFundraisingUseCase }
