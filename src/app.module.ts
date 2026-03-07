import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validations.pipe';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, PostModule, AuthModule],
  controllers: [AppController, PostController],
  providers: [AppService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes({
        path: 'users/*',
        method: RequestMethod.GET
      })
  }
}
