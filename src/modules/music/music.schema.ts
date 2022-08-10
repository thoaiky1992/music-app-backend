import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Genre } from '@src/modules/genre/genre.schema';

export type MusicDocument = Music & Document;

@Schema({ timestamps: true })
export class Music {
  @Prop()
  title: string;

  @Prop()
  artists: string;

  @Prop()
  slug: string;

  @Prop()
  image: string;

  @Prop()
  src: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: Types.ObjectId, ref: Genre.name })
  genre: Types.ObjectId;
}

export const MusicSchema = SchemaFactory.createForClass(Music);

MusicSchema.index({ name: 'text', title: 'text' });
