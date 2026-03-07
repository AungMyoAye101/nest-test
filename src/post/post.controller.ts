import { Controller, Get, Param } from '@nestjs/common';

@Controller('post')
export class PostController {
  @Get()
  findALl(): string {
    return 'All post ';
  }

  @Get(':postId')
  findOne(@Param('postId') postId: string) {
    return `get Post by ${postId} id.`;
  }
}
