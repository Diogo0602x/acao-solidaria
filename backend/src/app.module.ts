import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '@users/users.module'
import { AuthModule } from '@auth/auth.module'
import { FundraisingModule } from '@fundraising/fundraising.module'
import { AppDataSource } from '../ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => AppDataSource.options,
    }),
    AuthModule,
    UsersModule,
    FundraisingModule,
  ],
})
export class AppModule {}
