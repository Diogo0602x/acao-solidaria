import { Fundraising } from '../schemas/Fundraising'
import { ICreateFundraisingDTO } from '@modules/fundraising/dtos/ICreateFundraisingDTO'

class FundraisingRepository {
  public async create(data: ICreateFundraisingDTO): Promise<Fundraising> {
    const fundraising = new Fundraising(data)
    await fundraising.save()
    return fundraising
  }

  public async findById(id: string): Promise<Fundraising | undefined> {
    const fundraising = await Fundraising.findById(id)
      .populate('user')
      .populate('principalUser')
      .exec()
    return fundraising || undefined
  }

  public async findAll(): Promise<Fundraising[]> {
    return Fundraising.find().populate('user').populate('principalUser').exec()
  }

  public async findByUserId(userId: string): Promise<Fundraising[]> {
    return Fundraising.find({ user: userId })
      .populate('user')
      .populate('principalUser')
      .exec()
  }

  public async update(
    id: string,
    data: Partial<ICreateFundraisingDTO>,
  ): Promise<Fundraising | undefined> {
    const updatedFundraising = await Fundraising.findByIdAndUpdate(id, data, {
      new: true,
    }).exec()
    return updatedFundraising || undefined
  }

  public async delete(id: string): Promise<void> {
    await Fundraising.findByIdAndDelete(id).exec()
  }
}

export { FundraisingRepository }
