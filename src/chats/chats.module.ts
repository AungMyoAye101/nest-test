import { Module } from "@nestjs/common";
import { ChatsContoller } from "./chats.controller";
import { ChatsService } from "./chats.service";

@Module({
    controllers: [ChatsContoller],
    providers: [ChatsService]
})

export class ChatModule { }