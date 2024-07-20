import { Router } from 'express'
import { userRouter } from '@modules/users/infra/http/routes/user-routes'
import { principalUserRouter } from '@modules/users/infra/http/routes/principal-user-routes'

const usersRouter = Router()

usersRouter.use('/principal-users', principalUserRouter)
usersRouter.use('/users', userRouter)

export { usersRouter }
