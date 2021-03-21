import { AuthGuard } from '@nestjs/passport';
import { CommentService } from '@/services/comment.service';
import { CommentDetailDto } from '@/dto/comment.detail.dto';
import { CommentCreateDto } from '@/dto/comment.create.dto';
import { CommentSearchDto } from '@/dto/comment.search.dto';
import { Body, Query, Controller, Get, Post, Request, UseGuards, Param, BadRequestException, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller()
export class CommentController {
  constructor(
    private readonly service: CommentService,
  ) {}

  @ApiTags('Comment')
  @Get('/posts/:id/comments')
  @ApiQuery({
    type: Number,
    name: 'take',
    required: false,
  })
  @ApiQuery({
    type: Number,
    name: 'skip',
    required: false,
  })
  @ApiOkResponse({ type: CommentSearchDto })
  async search(
    @Param('id', ParseIntPipe) id: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
  ): Promise<CommentSearchDto> {
    return this.service.find(id, take, skip);
  }

  @ApiTags('Comment')
  @Post('/posts/:id/comments')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: CommentDetailDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Body() dto: CommentCreateDto,
    @Request() req: Dais.Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentDetailDto> {
    if (req.user) {
      const detail = await this.service.create(dto, id, req.user.id);
      if (detail) {
        return detail;
      }
    }
    throw new BadRequestException();
  }
}
