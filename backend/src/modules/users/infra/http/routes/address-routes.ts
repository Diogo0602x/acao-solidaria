import { Router } from 'express'
import {
  GetAddressByCepController,
  GetAddressByCepUseCase,
  ExternalAddressService,
} from '@users/use-cases'

const addressRoute = Router()
const externalAddressService = new ExternalAddressService()
const getAddressByCepUseCase = new GetAddressByCepUseCase(
  externalAddressService,
)
const getAddressByCepController = new GetAddressByCepController(
  getAddressByCepUseCase,
)

addressRoute.get('/:cep', (request, response) =>
  getAddressByCepController.handle(request, response),
)

export { addressRoute }
