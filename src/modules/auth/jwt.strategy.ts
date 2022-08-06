import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { config } from 'dotenv';
import { User, UserDocument } from '../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
config();

export const cookieExtractor: JwtFromRequestFunction = (req) => {
  let token = null;
  if (req && req.signedCookies) token = req.signedCookies['jwt'];

  return token;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRETE,
    });
  }

  async validate(payload: any) {
    const user: User = await this.userModel.findById(payload._id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
