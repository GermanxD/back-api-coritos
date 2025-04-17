import { Entity, Column, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { Verse } from './verse.entity';

@Entity()
export class Song {

  @PrimaryGeneratedColumn()
  @Column()
  title: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  typeCoro: number;

  @Column({ nullable: true, type: 'text' })
  chorus?: string;

  @OneToMany(() => Verse, (verse) => verse.song, { cascade: true })
  verses: Verse[];

  @UpdateDateColumn()
  updatedAt: Date;
}
