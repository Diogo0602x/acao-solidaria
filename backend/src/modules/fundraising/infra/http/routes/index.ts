import { Router } from 'express'
import { fundraisingRouter } from '@fundraising/infra/http/routes/fundraising-routes'

const fundraisingsRouter = Router()

fundraisingsRouter.use('/fundraising', fundraisingRouter)

export { fundraisingsRouter }
