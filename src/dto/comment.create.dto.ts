import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CommentCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(500)
  readonly desc: string;
}
