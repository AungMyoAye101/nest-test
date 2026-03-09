import { Module } from '@nestjs/common';
import { UsersHttpService } from './users-http.service';
import { UsersHttpController } from './users-http.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersHttpModule { }
