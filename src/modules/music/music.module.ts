import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Music, MusicSchema } from '@src/modules/music/music.schema';
import MusicController from '@src/modules/music/music.controller';
import { MusicService } from '@src/modules/music/music.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
