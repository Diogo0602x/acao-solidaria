interface ICreateUserDTO {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: 'church' | 'seminary' | 'priest' | 'seminarist' | 'pilgrim'
  cpf?: string
  cnpj?: string
  telephone: string
  cellphone?: string
  address: {
    street: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    complement?: string
  }
  linkedTo?: string // ID of the Church or Seminary the user is linked to
}

export { ICreateUserDTO }
