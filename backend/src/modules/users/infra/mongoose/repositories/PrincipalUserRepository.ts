import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'
import { ICreatePrincipalUserDTO } from '@modules/users/dtos/ICreatePrincipalUserDTO'

class PrincipalUserRepository implements IPrincipalUserRepository {
  public async create(data: ICreatePrincipalUserDTO): Promise<PrincipalUser> {
    const principalUser = new PrincipalUser(data)
    await principalUser.save()
    return principalUser
  }

  public async findById(id: string): Promise<PrincipalUser | null> {
    return PrincipalUser.findById(id).exec()
  }

  public async findByEmail(email: string): Promise<PrincipalUser | null> {
    return PrincipalUser.findOne({ email }).exec()
  }

  public async findByCnpj(cnpj: string): Promise<PrincipalUser | null> {
    return PrincipalUser.findOne({ cnpj }).exec()
  }

  public async findAll(): Promise<PrincipalUser[]> {
    return PrincipalUser.find().exec()
  }

  public async update(
    id: string,
    data: Partial<ICreatePrincipalUserDTO>,
  ): Promise<PrincipalUser | null> {
    return PrincipalUser.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  public async delete(id: string): Promise<void> {
    await PrincipalUser.findByIdAndDelete(id).exec()
  }
}

export { PrincipalUserRepository }
