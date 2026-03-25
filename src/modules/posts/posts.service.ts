import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreatePostType, PostQueryType, UpdatePostType } from './dto/post.schema';
import { PostWhereInput } from 'src/generated/prisma/models';

@Injectable()
export class PostsService {

  constructor(private prisma: PrismaService) { }
  async create(authorId: string, post: CreatePostType) {
    return await this.prisma.post.create({ data: { authorId, ...post } });
  }

  async findAll(query: PostQueryType) {
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


    return await this.prisma.post.findMany(
      {
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: sorting
        },

      }
    );
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
