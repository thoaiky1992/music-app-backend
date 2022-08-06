import { IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  name: string;
}
