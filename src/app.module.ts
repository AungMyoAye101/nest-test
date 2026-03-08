import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm"
import { DataSource } from "typeorm";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mssql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      entities: [],
      synchronize: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}