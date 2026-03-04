import { Test, TestingModule } from "@nestjs/testing";
import { ChatsContoller } from "./chats.controller"
import { ChatsService } from "./chats.service";

describe("ChatsController", () => {
    let controller: ChatsContoller;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChatsContoller],
            providers: [ChatsService]
        }).compile();

        controller = module.get<ChatsContoller>(ChatsContoller);
    })

    it("It should return all chats", () => {
        expect(controller.findALl()).toBe("Get all chats history.")
    })
})