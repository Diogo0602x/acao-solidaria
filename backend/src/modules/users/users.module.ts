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

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
  ],
  providers: [
    UsersRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
