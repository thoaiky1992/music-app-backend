import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { HASH_SALT } from '@src/constants';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ default: '/images/user/default.png' })
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function (next) {
  const self = this as User;
  self.password = bcryptjs.hash(self.password, HASH_SALT);
  next();
});
