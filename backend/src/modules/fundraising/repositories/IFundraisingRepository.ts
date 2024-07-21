import { Fundraising } from '@modules/fundraising/infra/mongoose/schemas/Fundraising'
import { ICreateFundraisingDTO } from '@modules/fundraising/dtos/ICreateFundraisingDTO'

interface IFundraisingRepository {
  create(data: ICreateFundraisingDTO): Promise<Fundraising>
  findById(id: string): Promise<Fundraising | null>
  findAll(): Promise<Fundraising[]>
  findByUserId(userId: string): Promise<Fundraising[]>
  update(
    id: string,
    data: Partial<ICreateFundraisingDTO>,
  ): Promise<Fundraising | null>
  delete(id: string): Promise<void>
}

export { IFundraisingRepository }
