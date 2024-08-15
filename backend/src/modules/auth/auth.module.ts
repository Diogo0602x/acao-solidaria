import { Module } from '@nestjs/common'
import { UsersModule } from '@users/users.module'
import { LoginService } from '@auth/use-cases/login/login.service'
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
  providers: [LoginService],
})
export class AuthModule {}
