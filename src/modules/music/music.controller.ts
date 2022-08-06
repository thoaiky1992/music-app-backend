import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/modules/auth/jwt.guard';
import { MusicService } from '@src/modules/music/music.service';
import { CreateMusicDto } from '@src/modules/music/create-music.dto';

@Controller('musics')
export default class MusicController {
  constructor(private musicService: MusicService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() createPostDto: CreateMusicDto) {
    return this.musicService.createOne(createPostDto);
  }

  @Get()
  async getMany(@Query('options') options) {
    return this.musicService.getMany(JSON.parse(options));
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Query('options') options) {
    return this.musicService.getOne(id, JSON.parse(options));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(@Param('id') id: string, @Query('options') options) {
    return this.musicService.updateOne(id, JSON.parse(options));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.musicService.deleteOne(id);
  }
}
