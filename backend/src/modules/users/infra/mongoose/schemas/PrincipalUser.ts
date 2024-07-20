import { Schema, model, Document } from 'mongoose'

interface Address {
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  complement?: string
}

interface PrincipalUser extends Document {
  name: string
  email: string
  password: string
  confirmPassword?: string
  role: 'church' | 'seminary'
  cnpj: string
  telephone: string
  cellphone?: string
  address: Address
}

const PrincipalUserSchema = new Schema<PrincipalUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  cnpj: { type: String, required: true },
  telephone: { type: String, required: true },
  cellphone: { type: String },
  address: {
    street: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    complement: { type: String },
  },
})

const PrincipalUser = model<PrincipalUser>('PrincipalUser', PrincipalUserSchema)

export { PrincipalUser }
