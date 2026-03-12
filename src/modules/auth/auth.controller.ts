import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserSchema, loginSchema, type LoginType, type CreateUserType } from './schema/auth.schema';
import { ZodValidationPipe } from 'src/validation/zod.pipe';
import { AuthGuard } from 'src/common/guards/auth.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  findAll() {
    return "THis is auth...";
  }

  @Post("register")
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async register(@Body() body: CreateUserType) {
    return this.authService.create(body)
  }


  @Post("login")
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() body: LoginType) {
    return this.authService.login(body)
  }

  //current user
  @UseGuards(AuthGuard)
  @Get("me")
  getProfile(@Request() req: any) {
    return req.user;
  }
}
