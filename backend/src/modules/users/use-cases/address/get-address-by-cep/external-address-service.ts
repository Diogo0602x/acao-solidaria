// src/modules/users/services/external-address-service.ts
import axios from 'axios'

interface IAddress {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
}

class ExternalAddressService {
  public async getAddressByCep(cep: string): Promise<IAddress> {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    if (response.data.erro) {
      throw new Error('Invalid CEP')
    }

    const {
      cep: postalCode,
      logradouro: street,
      bairro: neighborhood,
      localidade: city,
      uf: state,
    } = response.data

    return {
      cep: postalCode,
      street,
      neighborhood,
      city,
      state,
    }
  }
}

export { ExternalAddressService, IAddress }
