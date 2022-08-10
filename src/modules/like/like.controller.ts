import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LikeService } from '@src/modules/like/like.service';
import { JwtAuthGuard } from '@src/modules/auth/jwt.guard';
import { LikeDto } from '@src/modules/like/like.dto';
import { CurrentUser } from '@src/libraries/user.decorator';

@Controller('likes')
export default class LikeController {
  constructor(private likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() likeDto: LikeDto, @CurrentUser() user) {
    return this.likeService.createOne({ ...likeDto, user: user._id });
  }

  @Get()
  async getMany(@Query('options') options) {
    return this.likeService.getMany(JSON.parse(options));
  }

  @Post('delete')
  async deleteOne(@Body() options) {
    return this.likeService.deleteOneByOptions(options);
  }
}
