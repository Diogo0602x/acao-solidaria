import { createFundraising } from '@docs/modules/fundraising/create-fundraising'
import { updateFundraising } from '@docs/modules/fundraising/update-fundraising'
import { listFundraising } from '@docs/modules/fundraising/list-fundraising'
import { listFundraisingById } from '@docs/modules/fundraising/list-fundraising-by-id'
import { deleteFundraising } from '@docs/modules/fundraising/delete-fundraising'
import { purchaseFundraising } from '@docs/modules/fundraising/purchase-fundraising'
import { listFundraisingPurchasesByUser } from '@docs/modules/fundraising/list-fundraising-purchases-by-user'
import { listFundraisingSalesByUser } from '@docs/modules/fundraising/list-fundraising-sales-by-user'

const FundraisingRoutes = {
  createFundraising,
  updateFundraising,
  listFundraising,
  listFundraisingById,
  deleteFundraising,
  purchaseFundraising,
  listFundraisingPurchasesByUser,
  listFundraisingSalesByUser,
}

export { FundraisingRoutes }
