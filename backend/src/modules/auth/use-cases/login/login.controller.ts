import { Controller, Post, Body } from '@nestjs/common'
import { LoginService } from '@auth/use-cases/login/login.service'
import { LoginDto } from '@auth/dtos/login.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { User } from '@modules/users/entities/user.entity'

@ApiTags('Auth')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Authenticate a user and return a JWT token along with user data',
  })
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
    schema: {
      example: {
        token: 'jwt_token_example',
        user: {
          id: 'uuid-example',
          role: 'pilgrim',
          name: 'John Doe',
          email: 'user@example.com',
          cpf: '123.456.789-00',
          cnpj: null,
          telephone: '(11) 1234-5678',
          address: {
            street: 'Rua da Consolação',
            neighborhood: 'Centro',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01000-000',
            complement: 'Próximo ao metrô',
          },
          linkedTo: null,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ token: string; user: User }> {
    return this.loginService.execute(loginDto)
  }
}
