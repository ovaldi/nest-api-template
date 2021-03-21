import { ApiProperty } from '@nestjs/swagger';
import { UserSimpleDto } from './user.simple.dto';

export class CommentDetailDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly desc: string;

  @ApiProperty()
  readonly post_id: number;

  @ApiProperty({ type: UserSimpleDto })
  readonly creator: UserSimpleDto;

  @ApiProperty()
  created_at: Date;
}
