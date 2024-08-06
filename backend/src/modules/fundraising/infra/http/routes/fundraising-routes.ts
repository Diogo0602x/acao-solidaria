import { Router } from 'express'
import {
  CreateFundraisingController,
  UpdateFundraisingController,
  ListFundraisingController,
  ListFundraisingByIdController,
  DeleteFundraisingController,
  PurchaseFundraisingController,
  ListFundraisingPurchasesByUserController,
  ListFundraisingSalesByUserController,
} from '@fundraising/use-cases'

const fundraisingRouter = Router()

fundraisingRouter.post('/', new CreateFundraisingController().handle)
fundraisingRouter.put('/purchase', new PurchaseFundraisingController().handle)
fundraisingRouter.put(
  '/:fundraisingId',
  new UpdateFundraisingController().handle,
)
fundraisingRouter.get('/', new ListFundraisingController().handle)
fundraisingRouter.get(
  '/:fundraisingId',
  new ListFundraisingByIdController().handle,
)
fundraisingRouter.delete(
  '/:fundraisingId',
  new DeleteFundraisingController().handle,
)
fundraisingRouter.get(
  '/sales/user/:userId',
  new ListFundraisingSalesByUserController().handle,
)
fundraisingRouter.get(
  '/purchases/user/:userId',
  new ListFundraisingPurchasesByUserController().handle,
)

export { fundraisingRouter }
