import { IsNotEmpty, IsOptional } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  song: string;

  @IsOptional()
  user: string;
}
