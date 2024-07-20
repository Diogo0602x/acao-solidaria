import { Router } from 'express'
import {
  CreatePrincipalUserController,
  UpdatePrincipalUserController,
  ListPrincipalUserController,
  ListByIdPrincipalUserController,
  DeletePrincipalUserController,
  AuthenticatePrincipalUserController,
} from '@users/use-cases'

const principalUserRouter = Router()

principalUserRouter.post('/', new CreatePrincipalUserController().handle)
principalUserRouter.put(
  '/:principalUserId',
  new UpdatePrincipalUserController().handle,
)
principalUserRouter.get('/', new ListPrincipalUserController().handle)
principalUserRouter.get(
  '/:principalUserId',
  new ListByIdPrincipalUserController().handle,
)
principalUserRouter.delete(
  '/:principalUserId',
  new DeletePrincipalUserController().handle,
)
principalUserRouter.post(
  '/login',
  new AuthenticatePrincipalUserController().handle,
)

export { principalUserRouter }
