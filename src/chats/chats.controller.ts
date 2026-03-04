import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { CreateChat } from "./dto/create-chat.dto";

@Controller("chats")
export class ChatsContoller {
    constructor(private chatsService: ChatsService) { }

    @Get()
    findALl() {
        return this.chatsService.findALl()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.chatsService.findOne(+id)
    }

    @Post()
    createChat(@Body() createChat: CreateChat) {
        return this.chatsService.createChat(createChat)
    }

}