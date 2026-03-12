import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req = context.switchToHttp().getRequest();

        const token = req.headers.authorization?.split(" ")[1];
        console.log(token)
        if (!token) {
            throw new UnauthorizedException("You are not authorized.")
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);

            req['user'] = payload;
            console.log(req)
        } catch (error) {
            throw new UnauthorizedException("You are not authorized.")
        }

        return true;


    }
}