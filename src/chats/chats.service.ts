import { Injectable } from "@nestjs/common";
import { CreateChat } from "./dto/create-chat.dto";

@Injectable()
export class ChatsService {
    private chats = []
    private id = 0
    findALl() {
        return this.chats
    }

    findOne(id: number): string {
        return `Get chat by ${id} Id`
    }

    createChat(createChat: CreateChat) {
        console.log(createChat)
        const chat = {
            id: this.id++,
            ...createChat
        }
        return chat;
    }
}