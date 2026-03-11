import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserType } from './auth.schema';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserType): Promise<User> {
        console.log(data)

        return await this.prisma.user.create({ data })
    }
}
