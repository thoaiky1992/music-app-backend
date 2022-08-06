import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from '@src/modules/genre/genre.schema';
import GenreController from '@src/modules/genre/genre.controller';
import { GenreService } from '@src/modules/genre/genre.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
