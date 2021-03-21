import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { DictEntity } from '@/entities/dict.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(DictEntity)
    private readonly repo: Repository<DictEntity>,
  ) {}

  async findOne(options: FindOneOptions<DictEntity>): Promise<DictEntity | undefined> {
    return this.repo.findOne(options);
  }

  async find(options: FindManyOptions<DictEntity>): Promise<DictEntity[]> {
    return this.repo.find(options);
  }
}
