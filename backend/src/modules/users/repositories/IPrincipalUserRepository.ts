import { PrincipalUser } from '@modules/users/infra/mongoose/schemas/PrincipalUser'
import { ICreatePrincipalUserDTO } from '@modules/users/dtos/ICreatePrincipalUserDTO'

interface IPrincipalUserRepository {
  create(data: ICreatePrincipalUserDTO): Promise<PrincipalUser>
  findById(id: string): Promise<PrincipalUser | null>
  findByEmail(email: string): Promise<PrincipalUser | null>
  findByCnpj(cnpj: string): Promise<PrincipalUser | null>
  findAll(): Promise<PrincipalUser[]>
  update(
    id: string,
    data: Partial<ICreatePrincipalUserDTO>,
  ): Promise<PrincipalUser | null>
  delete(id: string): Promise<void>
}

export { IPrincipalUserRepository }
