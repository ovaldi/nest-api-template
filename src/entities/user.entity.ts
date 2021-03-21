import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  bio: string;

  @Column({ length: 32 })
  role: 'user' | 'admin';

  @Column({ length: 128 })
  name: string;

  @Column({ unique: true, length: 128 })
  email: string;

  @Column({ length: 128 })
  major: string;

  @Column({ length: 256 })
  avatar: string;

  @Column('tinyint')
  gender: 0 | 1 | 2;

  @Column({ length: 256 })
  firebase: string;

  @Column({ length: 64 })
  password: string;

  @Column()
  graduate: number;

  @Column('timestamp')
  birthday: Date;

  @Column('tinyint')
  is_deleted: 0 | 1;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  @Column()
  school_id: number;
}
