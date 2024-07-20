import { Router } from 'express'
import {
  CreateFundraisingController,
  UpdateFundraisingController,
  ListFundraisingController,
  ListFundraisingByIdController,
  ListFundraisingByUserController,
  ListFundraisingPurchasesByUserController,
  DeleteFundraisingController,
} from '@fundraising/use-cases'

const fundraisingRouter = Router()

fundraisingRouter.post('/', new CreateFundraisingController().handle)
fundraisingRouter.put(
  '/:fundraisingId',
  new UpdateFundraisingController().handle,
)
fundraisingRouter.get('/', new ListFundraisingController().handle)
fundraisingRouter.get(
  '/:fundraisingId',
  new ListFundraisingByIdController().handle,
)
fundraisingRouter.get(
  '/user/:userId',
  new ListFundraisingByUserController().handle,
)
fundraisingRouter.get(
  '/purchases/user/:userId',
  new ListFundraisingPurchasesByUserController().handle,
)
fundraisingRouter.delete(
  '/:fundraisingId',
  new DeleteFundraisingController().handle,
)

export { fundraisingRouter }
