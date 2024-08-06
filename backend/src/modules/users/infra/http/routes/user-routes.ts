import { Router } from 'express'
import {
  CreateUserController,
  UpdateUserController,
  ListUserController,
  ListUserByIdController,
  DeleteUserController,
  AuthenticateUserController,
  ComboSelectPrincipalUsersController,
} from '@users/use-cases'

const userRouter = Router()

userRouter.post('/', (request, response) =>
  new CreateUserController().handle(request, response),
)
userRouter.get('/principal-users/combo-select', (request, response) =>
  new ComboSelectPrincipalUsersController().handle(request, response),
)
userRouter.put('/:userId', (request, response) =>
  new UpdateUserController().handle(request, response),
)
userRouter.get('/', (request, response) =>
  new ListUserController().handle(request, response),
)
userRouter.get('/:userId', (request, response) =>
  new ListUserByIdController().handle(request, response),
)
userRouter.delete('/:userId', (request, response) =>
  new DeleteUserController().handle(request, response),
)
userRouter.post('/login', (request, response) =>
  new AuthenticateUserController().handle(request, response),
)

export { userRouter }
