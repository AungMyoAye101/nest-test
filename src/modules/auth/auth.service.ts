import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserType, LoginType } from './schema/auth.schema';
import type { User } from 'src/generated/prisma/client';
import bcrypt from "bcrypt"
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserType): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);


        return await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        })
    }

    //login
    async login(data: LoginType): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } })
        if (!user) {
            throw new NotFoundException("User not found.")
        }

        const match = await bcrypt.compare(data.password, user.password)

        if (!match) {
            throw new BadRequestException("Invalid Credential")
        }

        return user
    }

}
