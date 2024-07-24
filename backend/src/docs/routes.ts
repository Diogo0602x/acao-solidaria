import {
  UsersRoutes,
  PrincipalUserRoutes,
  AddressRoutes,
  FundraisingRoutes,
} from '@docs/modules'

const routes = {
  '/address/{cep}': {
    get: AddressRoutes.getAddressByCep,
  },
  '/principal-users': {
    post: PrincipalUserRoutes.createPrincipalUser,
    get: PrincipalUserRoutes.listPrincipalUser,
  },
  '/principal-users/{principalUserId}': {
    get: PrincipalUserRoutes.listPrincipalUserById,
    put: PrincipalUserRoutes.updatePrincipalUser,
    delete: PrincipalUserRoutes.deletePrincipalUser,
  },
  '/principal-users/combo-select': {
    get: PrincipalUserRoutes.comboSelectPrincipalUsers,
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
