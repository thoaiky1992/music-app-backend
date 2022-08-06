import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from '@src/modules/genre/genre.schema';
import BaseService from '@src/libraries/base.service';
import { CreateGenreDto } from '@src/modules/genre/create-genre.dto';

@Injectable()
export class GenreService extends BaseService<GenreDocument> {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {
    super();
  }
  async createOne(createPostDto: CreateGenreDto): Promise<Genre> {
    const createdCat = new this.genreModel(createPostDto);
    return createdCat.save();
  }

  async getOne(id: string, body): Promise<Genre> {
    return this.findByIdWithOptions(this.genreModel, id, body);
  }

  async getMany(body = undefined): Promise<{ rows: Genre[]; count: number }> {
    return await this.findWithOptions(this.genreModel, body);
  }

  async updateOne(id: string, body) {
    return await this.findByIdAndUpdate(this.genreModel, id, body);
  }

  async deleteOne(id: string) {
    return await this.findByIdAndDelete(this.genreModel, id);
  }
}
