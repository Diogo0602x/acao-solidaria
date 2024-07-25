import { User } from '@modules/users/infra/mongoose/schemas/User'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

class UserRepository implements IUserRepository {
  public async create(data: ICreateUserDTO): Promise<User> {
    const userData = { ...data }

    if (data.role === 'church' || data.role === 'seminary') {
      userData.cpf = undefined
    } else {
      userData.cnpj = undefined
    }

    const user = new User(userData)
    await user.save()
    return user
  }

  public async findById(id: string): Promise<User | null> {
    return User.findById(id).exec()
  }

  public async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ email }).exec()
  }

  public async findByCnpjCpf(identifier: string): Promise<User | null> {
    return User.findOne({
      $or: [{ cpf: identifier }, { cnpj: identifier }],
    }).exec()
  }

  public async findAll(): Promise<User[]> {
    return User.find().exec()
  }

  public async findByPrincipalUserId(principalUserId: string): Promise<User[]> {
    return User.find({ linkedTo: principalUserId }).exec()
  }

  public async update(
    id: string,
    data: Partial<IUpdateUserDTO>,
  ): Promise<User | null> {
    return User.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  public async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id).exec()
  }
}

export { UserRepository }
