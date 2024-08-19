import { Module } from '@nestjs/common'
import { UsersModule } from '@users/users.module'
import { LoginUseCase } from '@auth/use-cases/login/login.usecase'
import { LoginController } from '@auth/use-cases/login/login.controller'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginUseCase],
})
export class AuthModule {}
