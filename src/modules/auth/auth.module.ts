import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constant/jwt-service';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
