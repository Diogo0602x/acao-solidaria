import { User } from '@modules/users/infra/mongoose/schemas/User'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByCnpjCpf(identifier: string): Promise<User | null>
  findAll(): Promise<User[]>
  findByPrincipalUserId(principalUserId: string): Promise<User[]>
  update(id: string, data: Partial<IUpdateUserDTO>): Promise<User | null>
  delete(id: string): Promise<void>
}

export { IUserRepository }
