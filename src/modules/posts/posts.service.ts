import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreatePostType, PostQueryType, UpdatePostType } from './dto/post.schema';
import { PostWhereInput } from 'src/generated/prisma/models';
import { Cache, CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
@Injectable()
export class PostsService {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManger: Cache,
    private prisma: PrismaService
  ) { }

  async create(authorId: string, data: CreatePostType) {
    const post = await this.prisma.post.create({ data: { authorId, ...data } });
    await this.cacheManger.del("cache:posts:*");
    return post;
  }

  async findAll(query: PostQueryType) {
    // const cacheKey = `cache:posts:${JSON.stringify(query)}`
    // const cachedPost = await this.cacheManger.get(cacheKey);
    // if (cachedPost) {
    //   console.log("cached")
    //   return cachedPost;
    // }
    const { page, limit, sorting, search } = query;


    const where: PostWhereInput = {
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive"
        }
      }
      )
    }

    console.log("hit db")
    const posts = await this.prisma.post.findMany(
      {
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: sorting
        },

      }
    );
    // await this.cacheManger.set(cacheKey, posts, 300000)
    return posts;
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, email: true }
        }
      }
    })
    if (!post) {
      throw new NotFoundException("Post not found.")
    }
    return post;
  }

  async update(id: string, data: UpdatePostType) {
    const post = await this.prisma.post.findUnique({ where: { id } })
    if (!post) {
      throw new NotFoundException("Post not found.")

    }
    return await this.prisma.post.update({ where: { id }, data })
  }

  async remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
