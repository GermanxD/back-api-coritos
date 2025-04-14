import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Verse } from './entities/verse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Verse])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
