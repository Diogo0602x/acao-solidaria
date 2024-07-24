import { autenticatePrincipalUser } from '@docs/modules/users/principal-users/autenticate-principal-user'
import { createPrincipalUser } from '@docs/modules/users/principal-users/create-principal-user'
import { updatePrincipalUser } from '@docs/modules/users/principal-users/update-principal-user'
import { listPrincipalUser } from '@docs/modules/users/principal-users/list-principal-user'
import { listPrincipalUserById } from '@docs/modules/users/principal-users/list-principal-user-by-id'
import { deletePrincipalUser } from '@docs/modules/users/principal-users/delete-principal-user'
import { comboSelectPrincipalUsers } from '@docs/modules/users/principal-users/combo-select-principal-users'

const PrincipalUserRoutes = {
  autenticatePrincipalUser,
  createPrincipalUser,
  updatePrincipalUser,
  listPrincipalUser,
  listPrincipalUserById,
  deletePrincipalUser,
  comboSelectPrincipalUsers,
}

export { PrincipalUserRoutes }
