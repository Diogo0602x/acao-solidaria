import {
  UsersRoutes,
  AddressRoutes,
  FundraisingRoutes,
  EfiRoutes,
} from '@docs/modules'

const routes = {
  '/address/{cep}': {
    get: AddressRoutes.getAddressByCep,
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
  '/users/principal-users/combo-select': {
    get: UsersRoutes.comboSelectPrincipalUsers,
  },
  '/users/login': {
    get: UsersRoutes.authenticateUser,
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
  '/fundraising/purchase': {
    put: FundraisingRoutes.purchaseFundraising,
  },
  '/fundraising/purchases/user/{userId}': {
    get: FundraisingRoutes.listFundraisingPurchasesByUser,
  },
  '/fundraising/sales/user/{userId}': {
    get: FundraisingRoutes.listFundraisingSalesByUser,
  },
  '/efi': {
    post: EfiRoutes.authenticateToken,
  },
  '/efi/create-immediate-charge': {
    post: EfiRoutes.createImmediateCharge,
  },
}
export { routes }
