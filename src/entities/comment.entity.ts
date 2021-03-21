import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  desc: string;

  @Column()
  post_id: number;

  @OneToOne(() => PostEntity, it => it.id)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @Column()
  creator_id: number;

  @OneToOne(() => UserEntity, it => it.id)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  @Column('tinyint')
  is_deleted: 0 | 1;
}
