import { v4 as uuid } from 'uuid'
import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'
import { ICreatePrincipalUserDTO } from '@modules/users/dtos/ICreatePrincipalUserDTO'
import { IPrincipalUserRepository } from '@modules/users/repositories/IPrincipalUserRepository'

class FakePrincipalUserRepository implements IPrincipalUserRepository {
  private principalUsers: PrincipalUser[] = []

  public async create(data: ICreatePrincipalUserDTO): Promise<PrincipalUser> {
    const principalUser = new PrincipalUser()

    Object.assign(principalUser, { id: uuid() }, data)

    this.principalUsers.push(principalUser)

    return principalUser
  }

  public async findById(id: string): Promise<PrincipalUser | null> {
    const principalUser = this.principalUsers.find((user) => user.id === id)
    return principalUser || null
  }

  public async findByEmail(email: string): Promise<PrincipalUser | null> {
    const principalUser = this.principalUsers.find(
      (user) => user.email === email,
    )
    return principalUser || null
  }

  public async findByCnpj(cnpj: string): Promise<PrincipalUser | null> {
    const principalUser = this.principalUsers.find((user) => user.cnpj === cnpj)
    return principalUser || null
  }

  public async findAll(): Promise<PrincipalUser[]> {
    return this.principalUsers
  }

  public async update(
    id: string,
    data: Partial<ICreatePrincipalUserDTO>,
  ): Promise<PrincipalUser | null> {
    const index = this.principalUsers.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.principalUsers[index] = Object.assign(
        this.principalUsers[index],
        data,
      )
      return this.principalUsers[index]
    }
    return null
  }

  public async delete(id: string): Promise<void> {
    const index = this.principalUsers.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.principalUsers.splice(index, 1)
    }
  }
}

export { FakePrincipalUserRepository }
