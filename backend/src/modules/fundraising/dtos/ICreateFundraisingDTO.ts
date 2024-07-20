interface ICreateFundraisingDTO {
  name: string
  quantityAvailable: number
  imageUrl: string
  userId: string
  pixKeyCpf?: string
  pixKeyCnpj?: string
  user?: string
}

export { ICreateFundraisingDTO }
