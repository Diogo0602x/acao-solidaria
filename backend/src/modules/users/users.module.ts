import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from '@users/repositories/users.repository'
import { CreateUserController } from '@users/use-cases/create-user/create.user.controller'
import { CreateUserUseCase } from '@users/use-cases/create-user/create.user.usecase'
import { UpdateUserController } from '@users/use-cases/update-user/update.user.controller'
import { UpdateUserUseCase } from '@users/use-cases/update-user/update.user.usecase'
import { DeleteUserController } from '@users/use-cases/delete-user/delete.user.controller'
import { DeleteUserUseCase } from '@users/use-cases/delete-user/delete.user.usecase'
import { User } from '@users/entities/user.entity'
import { ListUsersController } from '@users/use-cases/list-users/list.users.controller'
import { ListUsersUseCase } from '@users/use-cases/list-users/list.users.usecase'
import { GetUserByIdController } from '@users/use-cases/get-user-by-id/get.user.by.id.controller'
import { GetUserByIdUseCase } from '@users/use-cases/get-user-by-id/get.user.by.id.usecase'
import { GetPrincipalUsersComboSelectController } from '@users/use-cases/get-principal-users-combo-select/get.principal.users.combo.select.controller'
import { GetPrincipalUsersComboSelectUseCase } from '@users/use-cases/get-principal-users-combo-select/get.principal.users.combo.select.usecase'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    ListUsersController,
    GetUserByIdController,
    GetPrincipalUsersComboSelectController,
  ],
  providers: [
    UsersRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUsersUseCase,
    GetUserByIdUseCase,
    GetPrincipalUsersComboSelectUseCase,
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
