import { UserEntity } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mine: 'photo' | 'video';

  @Column({ length: 256 })
  link: string;

  @Column({ length: 500 })
  desc: string;

  @Column()
  like: number;

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
