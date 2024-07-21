import { UsersRoutes, PrincipalUserRoutes } from '@docs/modules/users'
import { FundraisingRoutes } from '@docs/modules/fundraising'

const routes = {
  '/principal-users': {
    post: PrincipalUserRoutes.createPrincipalUser,
    get: PrincipalUserRoutes.listPrincipalUser,
  },
  '/principal-users/{principalUserId}': {
    get: PrincipalUserRoutes.listPrincipalUserById,
    put: PrincipalUserRoutes.updatePrincipalUser,
    delete: PrincipalUserRoutes.deletePrincipalUser,
  },
  '/users': {
    post: UsersRoutes.createUser,
    get: UsersRoutes.listUser,
  },
  '/users/{userId}': {
    get: UsersRoutes.listUserById,
    put: UsersRoutes.updateUser,
    delete: UsersRoutes.deleteUser,
  },
  '/fundraising': {
    post: FundraisingRoutes.createFundraising,
    get: FundraisingRoutes.listFundraising,
  },
  '/fundraising/{fundraisingId}': {
    get: FundraisingRoutes.listFundraisingById,
    put: FundraisingRoutes.updateFundraising,
    delete: FundraisingRoutes.deleteFundraising,
  },
  '/fundraising/user/{userId}': {
    get: FundraisingRoutes.listFundraisingByUser,
  },
}
export { routes }
