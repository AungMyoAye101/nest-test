import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from "./prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "./modules/users/users.module";
import { PostsModule } from "./modules/posts/posts.module";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager"
import { APP_INTERCEPTOR } from "@nestjs/core";
import { redisStore } from 'cache-manager-redis-yet';
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        stores: await redisStore({
          url: 'redis://localhost:6379',
          ttl: 60000
        })
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ]
})

export class AppModule { }


