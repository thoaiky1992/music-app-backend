import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from '@src/modules/like/like.schema';
import LikeController from '@src/modules/like/like.controller';
import { LikeService } from '@src/modules/like/like.service';
import { Music, MusicSchema } from '@src/modules/music/music.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Music.name, schema: MusicSchema },
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
