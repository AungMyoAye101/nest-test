import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, url } = req;
        console.log(`${new Date().toISOString()}...${method} , path : ${url}`);
        next()
    }

}