import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/zodValidation.pipe';
import { type CreateUserType, userSchema } from './user.schmea';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decoter';

@Controller('users')
@UseGuards(new AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()

  @UsePipes(new ZodValidationPipe(userSchema))
  create(@Body() createUserDto: CreateUserType) {
    return createUserDto;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
