import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { ExceptionFilter } from "@nestjs/common";
import { Response, Request } from "express";
@Catch(HttpException)
export class HTTPExpectionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        const status = exception.getStatus();
        const message = exception instanceof HttpException ? exception.message : "Something went worng."


        response.status(status).json({
            success: false,
            error: message,
            path: request.url,
            timestamp: new Date().toISOString()
        })
    }
}