import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn, IsUrl, MaxLength } from 'class-validator';

export class PostCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: ['photo', 'video'] })
  @IsIn(['photo', 'video'])
  readonly mine: 'photo' | 'video';

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(500)
  readonly desc: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly link: string;
}
