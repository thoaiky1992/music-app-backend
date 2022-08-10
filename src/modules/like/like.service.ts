import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import BaseService from '@src/libraries/base.service';
import { Like, LikeDocument } from '@src/modules/like/like.schema';
import { LikeDto } from '@src/modules/like/like.dto';
import { Music, MusicDocument } from '@src/modules/music/music.schema';

@Injectable()
export class LikeService extends BaseService<LikeDocument> {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
  ) {
    super(likeModel);
  }
  async createOne(likeDto: LikeDto): Promise<Like> {
    await this.musicModel.findByIdAndUpdate(likeDto.song, {
      $inc: { likes: 1 },
    });
    const createdLike = new this.likeModel(likeDto);
    return createdLike.save();
  }

  async getMany(options: any = {}): Promise<{ rows: Like[]; count: number }> {
    return await this.findWithOptions(options);
  }

  async deleteOneByOptions(options: any = {}) {
    const item = await this.likeModel.findOne(options);
    await this.musicModel.findByIdAndUpdate(options.song, {
      $inc: { likes: -1 },
    });
    return item.remove();
  }
}
