import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
