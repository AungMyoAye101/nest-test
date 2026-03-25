import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Req, Query, Inject, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { createPostSchema, postQueryschema, type PostQueryType, type CreatePostType, type UpdatePostType } from './dto/post.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-pipe';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { FileInterceptor } from "@nestjs/platform-express"

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) { }


  @Post()
  @UsePipes(new ZodValidationPipe(createPostSchema))
  create(@Req() req: any, @Body() createPostDto: CreatePostType) {
    return this.postsService.create(req.user.sub, createPostDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(50)
  @CacheKey("posts")
  @UsePipes(new ZodValidationPipe(postQueryschema))
  findAll(@Query() query: PostQueryType) {
    return this.postsService.findAll(query);
  }

  @Get(':id')

  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostType) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: "image/jpeg"
      })
      .addMaxSizeValidator({
        maxSize: 1000000
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })
  ) file: Express.Multer.File) {
    console.log(file)
    return file;
  }
}
