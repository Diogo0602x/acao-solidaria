import { Schema, model, Document } from 'mongoose'

interface FundraisingPurchase extends Document {
  fundraising: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
  quantity: number
}

const FundraisingPurchaseSchema = new Schema<FundraisingPurchase>({
  fundraising: {
    type: Schema.Types.ObjectId,
    ref: 'Fundraising',
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
})

const FundraisingPurchase = model<FundraisingPurchase>(
  'FundraisingPurchase',
  FundraisingPurchaseSchema,
)

export { FundraisingPurchase }
