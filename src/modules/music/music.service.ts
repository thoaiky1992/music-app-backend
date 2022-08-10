import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import BaseService from '@src/libraries/base.service';
import { Music, MusicDocument } from '@src/modules/music/music.schema';
import { CreateMusicDto } from '@src/modules/music/create-music.dto';

@Injectable()
export class MusicService extends BaseService<MusicDocument> {
  constructor(
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
  ) {
    super(musicModel);
  }
  async createOne(createPostDto: CreateMusicDto): Promise<Music> {
    const createdCat = new this.musicModel(createPostDto);
    return createdCat.save();
  }

  async getOne(id: string, options: any = {}): Promise<Music> {
    return this.findByIdWithOptions(id, options);
  }

  async getMany(options: any = {}): Promise<{ rows: Music[]; count: number }> {
    return await this.findWithOptions(options);
  }
}
