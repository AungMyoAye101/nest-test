import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreatePostType, UpdatePostType } from './dto/post.schema';

@Injectable()
export class PostsService {

  constructor(private prisma: PrismaService) { }
  async create(data: CreatePostType) {
    return await this.prisma.post.create({ data });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } })
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
