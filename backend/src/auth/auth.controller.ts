import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user and sign in' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Returns JWT access token', type: Object })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async signup(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);
    if (!result) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    return { access_token: result.access_token };
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Returns JWT access token', type: Object })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signin(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    if (!result) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    return result; // { access_token: string }
  }
}