import { createFundraising } from '@docs/modules/fundraising/create-fundraising'
import { updateFundraising } from '@docs/modules/fundraising/update-fundraising'
import { listFundraising } from '@docs/modules/fundraising/list-fundraising'
import { listFundraisingById } from '@docs/modules/fundraising/list-fundraising-by-id'
import { listFundraisingByUser } from '@docs/modules/fundraising/list-fundraising-by-user'
import { deleteFundraising } from '@docs/modules/fundraising/delete-fundraising'

const FundraisingRoutes = {
  createFundraising,
  updateFundraising,
  listFundraising,
  listFundraisingById,
  listFundraisingByUser,
  deleteFundraising,
}

export { FundraisingRoutes }
