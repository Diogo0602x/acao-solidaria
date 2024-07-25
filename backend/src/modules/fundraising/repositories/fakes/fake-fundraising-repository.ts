import { IFundraisingRepository } from '@modules/fundraising/repositories/IFundraisingRepository'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { ICreateFundraisingDTO } from '@modules/fundraising/dtos/ICreateFundraisingDTO'
import { IUpdateFundraisingDTO } from '@modules/fundraising/dtos/IUpdateFundraisingDTO'
import { ObjectId } from 'bson'

class FakeFundraisingRepository implements IFundraisingRepository {
  private fundraisings: Fundraising[] = []

  public async create(data: ICreateFundraisingDTO): Promise<Fundraising> {
    const fundraising: Fundraising = {
      ...data,
      _id: new ObjectId().toString(),
      id: new ObjectId().toString(),
      user: data.userId,
      quantitySold: 0, // Initial value
    } as unknown as Fundraising
    this.fundraisings.push(fundraising)
    return fundraising
  }

  public async findById(id: string): Promise<Fundraising | null> {
    const fundraising = this.fundraisings.find((fund) => fund._id === id)
    return fundraising || null
  }

  public async findAll(): Promise<Fundraising[]> {
    return this.fundraisings
  }

  public async findByUserId(userId: string): Promise<Fundraising[]> {
    return this.fundraisings.filter(
      (fundraising) => fundraising.user.toString() === userId,
    )
  }

  public async update(
    id: string,
    data: Partial<IUpdateFundraisingDTO>,
  ): Promise<Fundraising | null> {
    const index = this.fundraisings.findIndex((fund) => fund._id === id)
    if (index === -1) {
      return null
    }
    const updatedFundraising = {
      ...this.fundraisings[index],
      ...data,
    } as Fundraising
    this.fundraisings[index] = updatedFundraising
    return this.fundraisings[index]
  }

  public async delete(id: string): Promise<void> {
    const index = this.fundraisings.findIndex((fund) => fund._id === id)
    if (index !== -1) {
      this.fundraisings.splice(index, 1)
    }
  }
}

export { FakeFundraisingRepository }
