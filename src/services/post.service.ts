import { Injectable } from '@nestjs/common';
import { getManager, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '@/entities/post.entity';
import { PostCreateDto } from '@/dto/post.create.dto';
import { PostDetailDto } from '@/dto/post.detail.dto';
import { LikeShipEntity } from '@/entities/likeship.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repo: Repository<PostEntity>,
    @InjectRepository(LikeShipEntity)
    private readonly ship: Repository<LikeShipEntity>,
  ) {}

  async create(dto: PostCreateDto, uid: number): Promise<PostDetailDto | undefined> {
    const result = await this.repo.insert({
      ...dto,
      creator_id: uid,
    });
    const post = await this.repo.createQueryBuilder('post')
      .leftJoinAndSelect('post.creator', 'creator')
      .select([
        'post.id', 'post.mine', 'post.link', 'post.desc', 'post.like',
        'post.created_at', 'creator.id', 'creator.name', 'creator.avatar', 'creator.gender',
      ])
      .where('post.id = :id', { id: result.identifiers[0].id })
      .getOne();
    if (post) {
      return {
        ...post,
        is_like: 0,
      };
    }
  }

  async find(user_id: number, take = 20, skip = 0): Promise<PostDetailDto[]> {
    const posts = await this.repo.createQueryBuilder('post')
      .leftJoinAndSelect('post.creator', 'creator')
      .select([
        'post.id', 'post.mine', 'post.link', 'post.desc', 'post.like',
        'post.created_at', 'creator.id', 'creator.name', 'creator.avatar', 'creator.gender',
      ])
      .andWhere('post.is_deleted = 0')
      .orderBy(`post.created_at`, 'DESC')
      .skip(skip)
      .take(Math.min(take, 100))
      .getMany();
    
    if (posts.length) {
      const ships = await this.ship.find({
        where: {
          user_id,
          type: 'post',
          type_id: In(posts.map(x => x.id)),
        },
        select: ['type_id'],
      });
      return posts.map(x => ({
        ...x,
        is_like: ships.find(it => it.type_id === `${x.id}`) ? 1 : 0,
      }));
    }
    return [];
  }

  async like(user_id: number, post_id: number): Promise<void> {
    const exist = await this.ship.findOne({
      user_id,
      type: 'post',
      type_id: post_id.toString(),
    });
    if (exist) {
      return;
    }
    await getManager().transaction(async db => {
      await db.insert(LikeShipEntity, {
        user_id,
        type: 'post',
        type_id: post_id.toString(),
      });
      await db.update(PostEntity, post_id, {
        like: () => '`like` + 1',
      });
    });
  }

  async unlike(user_id: number, post_id: number): Promise<void> {
    const exist = await this.ship.findOne({
      user_id,
      type: 'post',
      type_id: post_id.toString(),
    });
    if (!exist) {
      return;
    }
    await getManager().transaction(async db => {
      await db.delete(LikeShipEntity, {
        user_id,
        type: 'post',
        type_id: post_id.toString(),
      });
      await db.update(PostEntity, post_id, {
        like: () => '`like` - 1',
      });
    });
  }
}
