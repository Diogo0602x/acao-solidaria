import { Schema, model, Document } from 'mongoose'

interface Address {
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  complement?: string
}

interface User extends Document {
  name: string
  email: string
  password: string
  role: 'church' | 'seminary' | 'priest' | 'seminarist' | 'pilgrim'
  cnpj?: string
  cpf?: string
  address: Address
  linkedTo?: string
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  cnpj: { type: String },
  cpf: { type: String },
  address: {
    street: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    complement: { type: String },
  },
  linkedTo: { type: String },
})

const User = model<User>('User', UserSchema)

export { User, UserSchema }
