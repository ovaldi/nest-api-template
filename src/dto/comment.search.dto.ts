import { ApiProperty } from '@nestjs/swagger';
import { CommentDetailDto } from './comment.detail.dto';

export class CommentSearchDto {
  @ApiProperty()
  readonly total: number;

  @ApiProperty({ type: [CommentDetailDto] })
  readonly items: CommentDetailDto[];
}
