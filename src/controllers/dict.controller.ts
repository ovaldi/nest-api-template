import { DictService } from '@/services/dict.service';
import { DictDetailDto } from '@/dto/dict.detail.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller()
export class DictController {
  constructor(
    private readonly service: DictService,
  ) {}

  @ApiTags('Dict')
  @Get('/dict')
  @ApiQuery({
    type: String,
    name: 'key',
    required: true,
    description: 'interest',
  })
  @ApiOkResponse({ type: [DictDetailDto] })
  async search(@Query('key') key: string): Promise<DictDetailDto[]> {
    return this.service.find({
      where: {
        key,
        is_deleted: 0,
      },
      select: ['id', 'key', 'logo', 'name'],
    });
  }
}
