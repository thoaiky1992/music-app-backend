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
    super();
  }
  async createOne(createPostDto: CreateMusicDto): Promise<Music> {
    const createdCat = new this.musicModel(createPostDto);
    return createdCat.save();
  }

  async getOne(id: string, body): Promise<Music> {
    return this.findByIdWithOptions(this.musicModel, id, body);
  }

  async getMany(body = undefined): Promise<{ rows: Music[]; count: number }> {
    return await this.findWithOptions(this.musicModel, body);
  }

  async updateOne(id: string, body) {
    return await this.findByIdAndUpdate(this.musicModel, id, body);
  }

  async deleteOne(id: string) {
    return await this.findByIdAndDelete(this.musicModel, id);
  }
}
