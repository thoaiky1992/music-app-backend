import { IsNotEmpty, IsOptional } from 'class-validator';

export class MyLibraryDto {
  @IsNotEmpty()
  songs: Array<string>;

  @IsOptional()
  user: string;
}
