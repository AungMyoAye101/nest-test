import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserType, LoginType } from './dto/auth.schema';
import bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { email } from 'zod';
@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService) { }

    async generateTokens(userId: string, email: string) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwt.signAsync(
                { sub: userId, email },
                { secret: process.env.ACCESS_TOKEN_SECRET as string, expiresIn: "15min" }
            ),
            this.jwt.signAsync(
                { sub: userId, email },
                { secret: process.env.REFRESH_TOKEN_SECRET as string, expiresIn: '7d' }
            )
        ])

        return { access_token, refresh_token }
    }

    async login(data: LoginType) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new NotFoundException("User not found.")
        }

        const match = await bcrypt.compare(data.password, user.password)
        if (!match) {
            throw new UnauthorizedException("Invalid credential.")
        }

        const { access_token, refresh_token } = await this.generateTokens(user.id, user.email);
        console.log(access_token);

        return await this.prisma.user.update({
            where: { id: user.id },
            data: { refresh_token }
        });

    }

    async register(data: CreateUserType) {
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const user = await this.prisma.user.create({ data: { ...data, password: hashedPassword } })
        if (!user) {
            throw new BadRequestException("Failed to register user.")
        }

        const { access_token, refresh_token } = await this.generateTokens(user.id, user.email);
        console.log(access_token);

        return await this.prisma.user.update(
            {
                where: { id: user.id },
                data: { refresh_token }
            })

    }

    async currentUser(id: string) {
        return this.prisma.user.findUnique({ where: { id } })
    }
}
