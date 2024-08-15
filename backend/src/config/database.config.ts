import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService) {}

  get connectionString(): string {
    return `postgres://${this.configService.get('DATABASE_USERNAME')}:${this.configService.get('DATABASE_PASSWORD')}@${this.configService.get('DATABASE_HOST')}:${this.configService.get('DATABASE_PORT')}/${this.configService.get('DATABASE_DATABASE')}`
  }
}
