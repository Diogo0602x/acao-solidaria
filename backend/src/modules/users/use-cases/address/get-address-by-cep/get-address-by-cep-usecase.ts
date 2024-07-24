import { ExternalAddressService, IAddress } from '@users/use-cases'

class GetAddressByCepUseCase {
  constructor(private externalAddressService: ExternalAddressService) {}

  public async execute(cep: string): Promise<IAddress> {
    return this.externalAddressService.getAddressByCep(cep)
  }
}

export { GetAddressByCepUseCase }
