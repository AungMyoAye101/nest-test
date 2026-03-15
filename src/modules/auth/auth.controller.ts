import { Body, Controller, Get, Post, Req, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserSchema, loginSchema, type CreateUserType, type LoginType } from './dto/auth.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-pipe';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('me')
  currentUser(@Req() req: any) {
    console.log(req)
    return this.authService.currentUser(req.user.sub)
  }
}
