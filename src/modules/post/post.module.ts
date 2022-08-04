import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PostController from './controllers/post.controller';
import { Post, PostSchema } from './post.schema';
import { PostService } from './services/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
