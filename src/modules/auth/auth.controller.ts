import {
  Controller,
  Body,
  Post,
  Res,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@src/modules/auth/jwt.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() payload: LoginUserDto, @Res() res: Response) {
    return this.authService.login(payload, res);
  }

  @Post('/signup')
  async signUp(@Body() user: CreateUserDto) {
    return this.authService.create(user);
  }

  @Get('/me')
  getCurrentUser(@Req() request: Request) {
    return this.authService.getCurrentUser(request);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/update-user')
  async updateUser(
    @Body() payload: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.updateUser(payload, file);
  }
}
