import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from '@users/repositories/users.repository'
import { CreateUserController } from '@users/use-cases/create-user/create.user.controller'
import { CreateUserUseCase } from '@users/use-cases/create-user/create.user.usecase'
import { User } from '@users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController],
  providers: [UsersRepository, CreateUserUseCase],
  exports: [UsersRepository],
})
export class UsersModule {}
