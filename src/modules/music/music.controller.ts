import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
}
