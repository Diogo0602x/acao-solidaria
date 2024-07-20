import { Router } from 'express'
import {
  CreateUserController,
  UpdateUserController,
  ListUserController,
  ListUserByIdController,
  DeleteUserController,
  AuthenticateUserController,
} from '@users/use-cases'

const userRouter = Router()

userRouter.post('/', new CreateUserController().handle)
userRouter.put('/:userId', new UpdateUserController().handle)
userRouter.get('/', new ListUserController().handle)
userRouter.get('/:userId', new ListUserByIdController().handle)
userRouter.delete('/:userId', new DeleteUserController().handle)
userRouter.post('/login', new AuthenticateUserController().handle)

export { userRouter }
