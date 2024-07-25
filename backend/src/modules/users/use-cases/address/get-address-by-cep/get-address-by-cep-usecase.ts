import { ExternalAddressService, IAddress } from '@users/use-cases'

class GetAddressByCepUseCase {
  constructor(private externalAddressService: ExternalAddressService) {}
  public async execute(cep: string): Promise<IAddress> {
    const normalizedCep = cep.replace(/\D/g, '')
    return this.externalAddressService.getAddressByCep(normalizedCep)
  }
}

export { GetAddressByCepUseCase }
