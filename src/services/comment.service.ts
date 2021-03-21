import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '@/entities/comment.entity';
import { CommentCreateDto } from '@/dto/comment.create.dto';
import { CommentSearchDto } from '@/dto/comment.search.dto';
import { CommentDetailDto } from '@/dto/comment.detail.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repo: Repository<CommentEntity>,
  ) {}

  async create(dto: CommentCreateDto, pid: number, uid: number): Promise<CommentDetailDto | undefined> {
    const result = await this.repo.insert({
      ...dto,
      post_id: pid,
      creator_id: uid,
    });
    return this.repo.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.creator', 'creator')
      .select([
        'comment.id', 'comment.desc', 'comment.created_at',
        'creator.id', 'creator.name', 'creator.avatar', 'creator.gender',
      ])
      .andWhere('comment.id = :id', { id: result.identifiers[0].id })
      .getOne();
  }

  async find(post_id: number, take = 20, skip = 0): Promise<CommentSearchDto> {
    const items = await this.repo.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.creator', 'creator')
      .select([
        'comment.id', 'comment.desc', 'comment.created_at',
        'creator.id', 'creator.name', 'creator.avatar', 'creator.gender',
      ])
      .andWhere('comment.post_id = :post_id', { post_id })
      .andWhere('comment.is_deleted = 0')
      .orderBy(`comment.created_at`, 'DESC')
      .skip(skip)
      .take(Math.min(take, 100))
      .getMany();

    const total = await this.repo.createQueryBuilder('comment')
      .andWhere('comment.post_id = :post_id', { post_id })
      .andWhere('comment.is_deleted = 0')
      .getCount();

    return {
      total,
      items,
    };
  }
}
