import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // New User - Swagger code 
  @ApiOperation({
    summary: "Auth user"
  })
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
    }
  })
  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success!';
  }
}