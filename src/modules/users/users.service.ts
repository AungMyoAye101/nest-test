import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async findAll() {
    return await this.prisma.user.findMany({ omit: { password: true, refresh_token: true } });
  }

  findOne(id: string) {
    const user = this.prisma.user.findUnique({ where: { id }, omit: { password: true, refresh_token: true } });
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }
}
