interface ICreateUserDTO {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: 'priest' | 'seminarist' | 'pilgrim'
  cpf: string
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
  linkedTo: string // ID da Church ou Seminary ao qual está vinculado
}

export { ICreateUserDTO }
