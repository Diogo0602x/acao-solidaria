interface ICreateFundraisingDTO {
  name: string
  quantity: number
  quantityAvailable: number
  price: number
  imageUrl: string
  userId: string
  pixKeyCpf?: string
  pixKeyCnpj?: string
  user?: string
}

export { ICreateFundraisingDTO }
