import { authenticateUser } from '@docs/modules/users/users/autenticate-user'
import { createUser } from '@docs/modules/users/users/create-user'
import { updateUser } from '@docs/modules/users/users/update-user'
import { listUser } from '@docs/modules/users/users/list-user'
import { listUserById } from '@docs/modules/users/users/list-user-by-id'
import { deleteUser } from '@docs/modules/users/users/delete-user'
import { comboSelectPrincipalUsers } from '@docs/modules/users/users/combo-select-principal-users'

const UsersRoutes = {
  authenticateUser,
  createUser,
  updateUser,
  listUser,
  listUserById,
  deleteUser,
  comboSelectPrincipalUsers,
}

export { UsersRoutes }
