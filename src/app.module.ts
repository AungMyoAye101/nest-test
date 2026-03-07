import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validations.pipe';
import { AuthModule } from './auth/auth.module';
import { LoggingInterceptor } from './logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    UsersModule,
    PostModule,
    AuthModule,
    ConfigModule
  ],
  controllers: [AppController, PostController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'users/*',
      method: RequestMethod.GET,
    });
  }
}
