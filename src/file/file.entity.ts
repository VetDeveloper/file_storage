import { UserEntity } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true
  })
  name: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  key: string;

  @Column({
    type: 'varchar',
  })
  link: string;

  @ManyToOne(() => UserEntity, (user) => user.files, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
