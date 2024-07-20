import { Router } from 'express'
import { UsersController } from '@modules/users/infra/http/controllers/UsersController'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post('/', usersController.create)
usersRouter.put('/:userId', usersController.update)
usersRouter.post('/login', usersController.authenticate)
usersRouter.get('/', usersController.list)
usersRouter.get('/:userId', usersController.show)
usersRouter.delete('/:userId', usersController.delete)

export { usersRouter }
