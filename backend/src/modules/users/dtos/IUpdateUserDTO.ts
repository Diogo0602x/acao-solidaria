interface IUpdateUserDTO {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  cpf?: string
  telephone?: string
  cellphone?: string
  address?: Partial<{
    street: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    complement?: string
  }>
  linkedTo?: string
}

export { IUpdateUserDTO }
