import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMusicDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  artists: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  src: string;

  @IsOptional()
  views: number;

  @IsOptional()
  likes: number;
}
