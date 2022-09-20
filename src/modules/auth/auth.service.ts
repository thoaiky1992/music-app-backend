import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User, UserDocument } from '../user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { join } from 'path';
import * as fs from 'fs';
import * as bcryptjs from 'bcryptjs';
import { HASH_SALT } from '@src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(authDto: LoginUserDto) {
    // find if user exist with this email
    const user = await this.userModel
      .findOne({ email: authDto.email })
      .select('+password')
      .exec();

    if (!user) {
      return null;
    }
    // find if user password match
    const match = await this.comparePassword(authDto.password, user.password);

    if (!match) {
      return null;
    }

    return user;
  }

  public async login(payloadLogin: LoginUserDto, res: Response) {
    const user = await this.validateUser(payloadLogin);

    if (!user) {
      throw new UnauthorizedException(
        'Email hoặc mật khẩu không chính xác. Xin vui lòng thử lại !',
      );
    }

    const payload = await this.userModel.findById(user._id);

    // generate access_token
    const access_token = await this.generateToken(payload.toJSON());

    // return the user and the token
    return res.json({ access_token });
    // const access_token = await this.generateToken(user);
    // return { user, token };
    // res
    //   .cookie('jwt', token, {
    //     httpOnly: true,
    //     signed: true,
    //     sameSite: 'strict',
    //     maxAge: 1000 * 60 * 60 * 24 * 60, // would expire after 60 days
    //   })
    //   .send({ token });
    // return { access_token };
  }

  public async create(payload: CreateUserDto) {
    const isExist = await this.userModel
      .findOne({ email: payload.email })
      .exec();

    if (isExist) {
      throw new HttpException('This email already exists', HttpStatus.CONFLICT);
    }

    // hash the password
    payload.password = await this.hashPassword(payload.password);

    // create the user
    const newUser = new this.userModel(payload);
    return (await newUser.save()) ? { result: true } : { result: false };
  }

  async getCurrentUser(request: Request) {
    const token = request.headers['authorization'].split(' ')[1];
    const payload = await this.jwtService.verify(token);
    return payload;
  }

  private async generateToken(user, expiresIn = '30 days') {
    if (user?.password) delete user.password;
    if (user?.refreshToken) delete user.refreshToken;
    return await this.jwtService.signAsync(user, { expiresIn });
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, HASH_SALT);
  }

  async comparePassword(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }

  async updateUser(payload: any, file: Express.Multer.File) {
    const data = {
      name: payload.name,
      email: payload.email,
    };

    if (file) {
      const uploadPath = '/images/user';
      console.log(join(__dirname, '..', '..', '..', 'public', uploadPath));

      const disk = {
        fullpath: join(...[__dirname, '..', '..', '..', 'public', uploadPath]),
        publicPath: join(...[uploadPath]),
      };
      if (!fs.existsSync(disk.fullpath)) {
        fs.mkdirSync(disk.fullpath, { recursive: true });
      }
      const filename = `${Date.now()}-${file.originalname}`;
      fs.writeFileSync(join(disk.fullpath, String(filename)), file.buffer);
      data['image'] = `${disk.publicPath}/${filename}`;
    }
    if (payload.newPassword.length) {
      data['password'] = bcryptjs.hash(payload.newPassword, HASH_SALT);
    }
    const updateUser = await this.userModel.findOneAndUpdate(
      {
        email: data.email,
      },
      { ...data },
      { new: true },
    );

    // generate access_token
    const access_token = await this.generateToken(updateUser.toJSON());

    // return the user and the token
    return { access_token };
  }
}
