import { User } from '../schemas/User'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { PrincipalUser } from '../schemas/PrincipalUser'

class UserRepository {
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User({
      ...data,
      linkedTo: data.linkedTo as unknown as PrincipalUser,
    })
    await user.save()
    return user
  }

  public async findById(id: string): Promise<User | null> {
    return User.findById(id)
  }

  public async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ email })
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    return User.findOne({ cpf })
  }

  public async findAll(): Promise<User[]> {
    return User.find()
  }

  public async findByPrincipalUserId(principalUserId: string): Promise<User[]> {
    return User.find({ linkedTo: principalUserId })
  }

  public async update(
    id: string,
    data: Partial<IUpdateUserDTO>,
  ): Promise<User | null> {
    return User.findByIdAndUpdate(id, data, { new: true })
  }

  public async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id)
  }
}

export { UserRepository }
