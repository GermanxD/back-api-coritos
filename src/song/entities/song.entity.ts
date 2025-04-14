import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Verse } from './verse.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

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
}
