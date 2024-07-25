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
  confirmPassword?: string
  role: 'church' | 'seminary' | 'priest' | 'seminarist' | 'pilgrim'
  cpf?: string
  cnpj?: string
  telephone: string
  cellphone?: string
  address: Address
  linkedTo?: Schema.Types.ObjectId
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  cpf: { type: String },
  cnpj: { type: String },
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
  linkedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const User = model<User>('User', UserSchema)

export { User }
