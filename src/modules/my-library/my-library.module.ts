import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MyLibrary,
  MyLibrarySchema,
} from '@src/modules/my-library/my-library.schema';
import MyLibraryController from '@src/modules/my-library/my-library.controller';
import { MyLibraryService } from '@src/modules/my-library/my-library.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MyLibrary.name, schema: MyLibrarySchema },
    ]),
  ],
  controllers: [MyLibraryController],
  providers: [MyLibraryService],
})
export class MyLibraryModule {}
