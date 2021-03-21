import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'likeship' })
export class LikeShipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'post' | 'message';

  @Column()
  user_id: number;

  @Column()
  type_id: string;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;
}
