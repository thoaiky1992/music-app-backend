import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../post.schema';
import { CreatePostDto } from '../dto/create-post.dto';
import BaseService from '@src/libraries/base.service';

@Injectable()
export class PostService extends BaseService<PostDocument> {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {
    super();
  }

  async createOne(createPostDto: CreatePostDto): Promise<Post> {
    const createdCat = new this.postModel(createPostDto);
    return createdCat.save();
  }

  async getOne(id: string, body): Promise<Post> {
    return this.findByIdWithOptions(this.postModel, id, body);
  }

  async getMany(body = undefined): Promise<{ rows: Post[]; count: number }> {
    return await this.findWithOptions(this.postModel, body);
  }

  async updateOne(id: string, body) {
    return await this.findByIdAndUpdate(this.postModel, id, body);
  }

  async deleteOne(id: string) {
    return await this.findByIdAndDelete(this.postModel, id);
  }
}
