import { ApiProperty } from '@nestjs/swagger';
import { UserSimpleDto } from './user.simple.dto';

export class PostDetailDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly mine: string;

  @ApiProperty()
  readonly desc: string;

  @ApiProperty()
  readonly link: string;

  @ApiProperty()
  readonly like: number;

  @ApiProperty({ description: '0: not, 1: yes' })
  readonly is_like: 0 | 1;

  @ApiProperty({ type: UserSimpleDto })
  readonly creator: UserSimpleDto;

  @ApiProperty()
  readonly created_at: Date;
}
