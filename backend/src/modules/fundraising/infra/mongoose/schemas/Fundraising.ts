import { Schema, model, Document } from 'mongoose'

interface Fundraising extends Document {
  name: string
  quantity: number
  quantityAvailable: number
  quantitySold: number
  price: number
  imageUrl: string
  user: Schema.Types.ObjectId
  pixKeyCpf?: string
  pixKeyCnpj?: string
}

const FundraisingSchema = new Schema<Fundraising>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  quantityAvailable: { type: Number, required: true },
  quantitySold: { type: Number, default: 0 },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pixKeyCpf: { type: String },
  pixKeyCnpj: { type: String },
})

const Fundraising = model<Fundraising>('Fundraising', FundraisingSchema)

export { Fundraising }
