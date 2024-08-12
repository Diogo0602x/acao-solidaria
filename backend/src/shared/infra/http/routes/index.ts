import { Router } from 'express'
import { fundraisingsRouter } from '@modules/fundraising/infra/http/routes/'
import { usersRouter } from '@modules/users/infra/http/routes'
import { efisRouter } from '@modules/efi/infra/http/routes'

const routes = Router()

routes.use(usersRouter)
routes.use(fundraisingsRouter)
routes.use(efisRouter)

export { routes }
