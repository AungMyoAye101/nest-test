import { Controller } from '@nestjs/common';
import { UsersHttpService } from './users-http.service';

@Controller('users-http')
export class UsersHttpController {
  constructor(private readonly usersHttpService: UsersHttpService) {}
}
