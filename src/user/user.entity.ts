import { Exclude } from "class-transformer";
import { FileEntity } from "src/file/file.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 35,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FileEntity, (content) => content.user)
  files?: FileEntity[];
}