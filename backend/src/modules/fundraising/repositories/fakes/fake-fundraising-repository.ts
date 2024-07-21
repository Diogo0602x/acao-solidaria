import { v4 as uuid } from 'uuid'
import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { ICreateFundraisingDTO } from '@modules/fundraising/dtos/ICreateFundraisingDTO'

class FakeFundraisingRepository {
  private fundraisings: Fundraising[] = []

  public async create(data: ICreateFundraisingDTO): Promise<Fundraising> {
    const fundraising = new Fundraising()

    Object.assign(fundraising, { id: uuid() }, data)

    this.fundraisings.push(fundraising)

    return fundraising
  }

  public async findById(id: string): Promise<Fundraising | null> {
    const fundraising = this.fundraisings.find(
      (fundraising) => fundraising.id === id,
    )
    return fundraising || null
  }

  public async findAll(): Promise<Fundraising[]> {
    return this.fundraisings
  }

  public async findByUserId(userId: string): Promise<Fundraising[]> {
    return this.fundraisings.filter(
      (fundraising) =>
        fundraising.user && fundraising.user.toString() === userId,
    )
  }

  public async update(
    id: string,
    data: Partial<ICreateFundraisingDTO>,
  ): Promise<Fundraising | null> {
    const index = this.fundraisings.findIndex(
      (fundraising) => fundraising.id === id,
    )
    if (index !== -1) {
      this.fundraisings[index] = Object.assign(this.fundraisings[index], data)
      return this.fundraisings[index]
    }
    return null
  }

  public async delete(id: string): Promise<void> {
    const index = this.fundraisings.findIndex(
      (fundraising) => fundraising.id === id,
    )
    if (index !== -1) {
      this.fundraisings.splice(index, 1)
    }
  }
}

export { FakeFundraisingRepository }
