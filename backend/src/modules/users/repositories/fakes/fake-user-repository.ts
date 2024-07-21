import { v4 as uuid } from 'uuid'
import { User } from '@modules/users/infra/mongoose/schemas/User'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'

class FakeUserRepository {
  private users: User[] = []

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid() }, data)

    this.users.push(user)

    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)
    return user || null
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    return user || null
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    const user = this.users.find((user) => user.cpf === cpf)
    return user || null
  }

  public async findAll(): Promise<User[]> {
    return this.users
  }

  public async findByPrincipalUserId(principalUserId: string): Promise<User[]> {
    return this.users.filter(
      (user) => user.linkedTo?.toString() === principalUserId,
    )
  }

  public async update(
    id: string,
    data: Partial<ICreateUserDTO>,
  ): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.users[index] = Object.assign(this.users[index], data)
      return this.users[index]
    }
    return null
  }

  public async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.users.splice(index, 1)
    }
  }
}

export { FakeUserRepository }
