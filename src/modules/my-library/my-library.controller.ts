import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/modules/auth/jwt.guard';
import { CurrentUser } from '@src/libraries/user.decorator';
import { MyLibraryService } from '@src/modules/my-library/my-library.service';
import { MyLibraryDto } from '@src/modules/my-library/my-library.dto';

@Controller('my-libraries')
export default class MyLibraryController {
  constructor(private myLibraryService: MyLibraryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() myLibraryDto: MyLibraryDto, @CurrentUser() user) {
    return this.myLibraryService.createOne({ ...myLibraryDto, user: user._id });
  }

  @Get()
  async getMany(@Query('options') options) {
    return this.myLibraryService.getMany(JSON.parse(options || '{}'));
  }

  @Post('delete-this-song')
  async removeThisSong(@Body() options) {
    return this.myLibraryService.removeThisSong(options || {});
  }
}
