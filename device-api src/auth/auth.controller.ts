// src/auth/auth.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { username, password } = body;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }
}
