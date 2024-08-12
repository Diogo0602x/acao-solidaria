import { Router } from 'express'
import {
  AuthenticateTokenController,
  CreateImmediateChargeController,
} from '@efi/use-cases'

const efiRouter = Router()

efiRouter.post('/', new AuthenticateTokenController().handle)
efiRouter.post(
  '/create-immediate-charge',
  new CreateImmediateChargeController().handle,
)

export { efiRouter }
