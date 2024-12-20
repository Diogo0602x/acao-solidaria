import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'
import { Fundraising } from '../schemas/Fundraising'
import { ICreateFundraisingDTO } from '@modules/fundraising/dtos/ICreateFundraisingDTO'
import { IUpdateFundraisingDTO } from '@modules/fundraising/dtos/IUpdateFundraisingDTO'
import mongoose from 'mongoose'

class FundraisingRepository implements IFundraisingRepository {
  public async create(data: ICreateFundraisingDTO): Promise<Fundraising> {
    const fundraising = new Fundraising(data)
    await fundraising.save()
    return fundraising
  }

  public async findById(id: string): Promise<Fundraising | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }
    return Fundraising.findById(id).populate('user').exec()
  }

  public async findAll(): Promise<Fundraising[]> {
    return Fundraising.find().populate('user').exec()
  }

  public async findByUserId(userId: string): Promise<Fundraising[]> {
    return Fundraising.find({ user: userId }).populate('user').exec()
  }

  public async update(
    id: string,
    data: Partial<IUpdateFundraisingDTO>,
  ): Promise<Fundraising | null> {
    const updatedFundraising = await Fundraising.findByIdAndUpdate(id, data, {
      new: true,
    }).exec()
    return updatedFundraising
  }

  public async delete(id: string): Promise<void> {
    await Fundraising.findByIdAndDelete(id).exec()
  }
}

export { FundraisingRepository }
