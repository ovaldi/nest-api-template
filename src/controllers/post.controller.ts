import { AuthGuard } from '@nestjs/passport';
import { PostService } from '@/services/post.service';
import { PostCreateDto } from '@/dto/post.create.dto';
import { PostDetailDto } from '@/dto/post.detail.dto';
import { Body, Query, Controller, Get, Post, Request, UseGuards, Put, BadRequestException, Delete, Param, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller()
export class PostController {
  constructor(
    private readonly service: PostService,
  ) {}

  @ApiTags('Post')
  @Get('/posts')
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
  @ApiOkResponse({ type: [PostDetailDto] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiUnauthorizedResponse()
  async search(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
    @Request() req: Dais.Request,
  ): Promise<PostDetailDto[]> {
    if (req.user) {
      return this.service.find(req.user.id, take, skip);
    }
    throw new BadRequestException();
  }

  @ApiTags('Post')
  @Post('/posts')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: PostDetailDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Body() dto: PostCreateDto,
    @Request() req: Dais.Request,
  ): Promise<PostDetailDto> {
    if (req.user) {
      const detail = await this.service.create(dto, req.user.id);
      if (detail) {
        return detail;
      }
    }
    throw new BadRequestException();
  }

  @ApiTags('Post')
  @Put('/posts/:id/like')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async like(@Request() req: Dais.Request, @Param('id', ParseIntPipe) id: number): Promise<void> {
    if (req.user) {
      return this.service.like(req.user.id, id);
    }
    throw new BadRequestException();
  }

  @ApiTags('Post')
  @Delete('/posts/:id/like')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async unlike(@Request() req: Dais.Request, @Param('id', ParseIntPipe) id: number): Promise<void> {
    if (req.user) {
      return this.service.unlike(req.user.id, id);
    }
  }
}
