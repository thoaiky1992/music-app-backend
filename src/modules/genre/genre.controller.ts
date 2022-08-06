import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GenreService } from '@src/modules/genre/genre.service';
import { CreateGenreDto } from '@src/modules/genre/create-genre.dto';

@Controller('genres')
export default class GenreController {
  constructor(private genreService: GenreService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() createPostDto: CreateGenreDto) {
    return this.genreService.createOne(createPostDto);
  }

  @Get()
  async getMany(@Query('options') options) {
    return this.genreService.getMany(JSON.parse(options));
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Query('options') options) {
    return this.genreService.getOne(id, JSON.parse(options));
  }
}
