import { CodeService } from '@/services/code.service';
import { CodeCreateDto } from '@/dto/code.create.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class CodeController {
  constructor(
    private readonly service: CodeService,
  ) {}

  @ApiTags('Code')
  @Post('/codes')
  @ApiNoContentResponse()
  async list(@Body() dto: CodeCreateDto): Promise<void> {
    await this.service.send(dto.email);
  }
}
