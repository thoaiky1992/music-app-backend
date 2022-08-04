import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../services/post.service';

@Controller('posts')
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createOne(@Body() createPostDto: CreatePostDto) {
    return this.postService.createOne(createPostDto);
  }

  @Get()
  async getMany(@Body() body) {
    return this.postService.getMany(body);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Body() body) {
    return this.postService.getOne(id, body);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() body) {
    return this.postService.updateOne(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.postService.deleteOne(id);
  }
}
