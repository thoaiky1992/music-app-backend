import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { UserModule } from '../user/user.module';
config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRETE,
      // signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    UserModule,
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
