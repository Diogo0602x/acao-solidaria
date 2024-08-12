import { Router } from 'express'
import { efiRouter } from '@efi/infra/http/routes/efi-routes'

const efisRouter = Router()

efisRouter.use('/efi', efiRouter)

export { efisRouter }
