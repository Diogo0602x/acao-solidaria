import { User } from '@/modules/users/types'

export interface Fundraising {
  _id: string
  name: string
  quantity: number
  quantityAvailable: number
  price: number
  imageUrl: string
  userId: string
  pixKeyCpf?: string
  pixKeyCnpj?: string
  user?: User
  quantitySold?: number
}

export interface GeneratePurchaseFundraisingData {
  calendario: {
    expiracao: number
  }
  devedor: {
    cpf: string
    nome: string
  }
  valor: {
    original: string
  }
  chave: string
}
