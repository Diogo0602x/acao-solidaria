interface IUpdatePrincipalUserDTO {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  cnpj?: string
  telephone?: string
  cellphone?: string
  address?: {
    street?: string
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
    complement?: string
  }
}

export { IUpdatePrincipalUserDTO }
