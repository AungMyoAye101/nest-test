import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwt: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req = context.switchToHttp().getRequest();
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            throw new UnauthorizedException("Invalid credentail.")
        }

        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: process.env.ACCESS_TOKEN_SECRET
            })

            req['user'] = payload;
        } catch (error) {
            console.error("Failed to verify token")
            throw new UnauthorizedException("Invalid credentail")
        }
        return true;
    }
}