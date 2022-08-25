import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Music } from '@src/modules/music/music.schema';
import { User } from '@src/modules/user/user.schema';

export type MyLibraryDocument = MyLibrary & Document;

@Schema({ collection: 'my_libraries' })
export class MyLibrary {
  @Prop({ type: [{ type: Types.ObjectId, ref: Music.name, index: true }] })
  songs: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: User.name, index: true })
  user: Types.ObjectId;
}

export const MyLibrarySchema = SchemaFactory.createForClass(MyLibrary);
