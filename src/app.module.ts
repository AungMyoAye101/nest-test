import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chats/chats.module';

@Module({
  imports: [UsersModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
