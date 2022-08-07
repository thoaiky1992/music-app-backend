import { IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;
}
