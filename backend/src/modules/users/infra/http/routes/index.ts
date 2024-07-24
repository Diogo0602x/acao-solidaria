import { Router } from 'express'
import { userRouter } from '@modules/users/infra/http/routes/user-routes'
import { principalUserRouter } from '@modules/users/infra/http/routes/principal-user-routes'
import { addressRoute } from '@modules/users/infra/http/routes/address-routes'

const usersRouter = Router()

usersRouter.use('/principal-users', principalUserRouter)
usersRouter.use('/users', userRouter)
usersRouter.use('/address', addressRoute)

export { usersRouter }
