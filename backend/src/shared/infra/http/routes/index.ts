import { Router } from 'express'
import { fundraisingsRouter } from '@modules/fundraising/infra/http/routes/'
import { usersRouter } from '@modules/users/infra/http/routes'

const routes = Router()

routes.use(usersRouter)
routes.use(fundraisingsRouter)

export { routes }
