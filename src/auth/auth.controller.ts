import {
  Controller,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthResponse } from './dto/response-auth.dto';

@ApiTags('Logon and Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Успешная авторизация',
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Неправильный email или пароль' })
  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: AuthUserDto })
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    const answ = AuthResponse.create(await this.authService.login(user));
    return answ;
  }

  @ApiBadRequestResponse({
    description: 'Пользователь с таким email уже существует',
  })
  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({
    status: 201,
    type: AuthResponse,
  })
  @Post('reg')
  async reg(@Body() userDto: AuthUserDto) {
    const answ = AuthResponse.create(
      await this.authService.registration(userDto),
    );
    return answ;
  }
}
