interface CreateUserDTO {
  name: string
  email: string
  password: string
  role: 'church' | 'seminary' | 'priest' | 'seminarist' | 'pilgrim'
  cnpj?: string
  cpf?: string
  address: {
    street: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    complement?: string
  }
  linkedTo?: string
}

export { CreateUserDTO }
