import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserSchema, loginSchema, type CreateUserType, type LoginType } from './dto/auth.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  @UsePipes(new ZodValidationPipe(createUserSchema))
  register(@Body() body: CreateUserType) {
    return this.authService.register(body)
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() body: LoginType) {
    return this.authService.login(body)
  }
}
