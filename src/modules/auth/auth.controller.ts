import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserSchema, type CreateUserType } from './auth.schema';
import { ZodValidationPipe } from 'src/validation/zod.pipe';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  findAll() {
    return "THis is auth...";
  }

  @Post("register")
  async register(@Body() body: CreateUserType) {
    return this.authService.create(body)
  }
}
