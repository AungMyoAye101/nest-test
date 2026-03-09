import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { LoggerMiddleware } from "./common/middlewares/log.middleware";
import { TypeOrmModule } from "@nestjs/typeorm"
import { DataSource } from "typeorm";
import { User } from "./modules/user/entities/user.entity";
import { PhotoModule } from './modules/photo/photo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_test',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true

    }),
    UserModule,
    PhotoModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private datasource: DataSource) { }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
