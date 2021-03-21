import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dict' })
export class DictEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  key: string;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 256 })
  logo: string;

  @Column('tinyint')
  is_deleted: 0 | 1;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;
}
