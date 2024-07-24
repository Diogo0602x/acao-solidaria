import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'

class DeleteFundraisingUseCase {
  constructor(private fundraisingRepository: IFundraisingRepository) {}

  public async execute(id: string): Promise<void> {
    const fundraising = await this.fundraisingRepository.findById(id)

    if (!fundraising) {
      throw new Error('Fundraising not found')
    }

    await this.fundraisingRepository.delete(id)
  }
}

export { DeleteFundraisingUseCase }
