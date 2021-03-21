import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'code' })
export class CodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 6 })
  code: string;

  @Column({ length: 128 })
  email: string;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  @Column('tinyint')
  is_deleted: 0 | 1;
}
