import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Music } from '@src/modules/music/music.schema';
import { User } from '@src/modules/user/user.schema';
import { GlobalGateway } from '@src/gateway/gateway';
import { SOCKET_LIKE_CREATED, SOCKET_LIKE_DELETED } from '@src/constants';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ type: Types.ObjectId, ref: Music.name, index: true })
  song: string;

  @Prop({ type: Types.ObjectId, ref: User.name, index: true })
  user: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

LikeSchema.post<Like>('save', function (doc, next) {
  GlobalGateway.server.emit(SOCKET_LIKE_CREATED, doc);
  next();
});

LikeSchema.post<Like>('remove', function (doc, next) {
  GlobalGateway.server.emit(SOCKET_LIKE_DELETED, doc);
  next();
});
