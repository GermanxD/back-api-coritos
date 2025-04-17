import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('hola')
  getHola(): string {
    return 'Hola';
  }

  @Post()
  async create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Get('type/:type_coro')
  async findByTypeCoro(@Param('type_coro') type_coro: number) {
    return await this.songService.findByTypeCoro(type_coro);
  }

  @Get()
  async findAll() {
    return await this.songService.findAll();
  }

  @Post('bulk')
  async createBulk(@Body() createSongsDto: CreateSongDto[]) {
    try {
      return await this.songService.createBulk(createSongsDto);
    } catch (error) {
      console.error('Error al hacer bulk insert:', error);
      throw error;
    }
  }

  @Get('updates')
  async getUpdatedSongs(@Query('since') since: string) {
    const date = new Date(since);
    return this.songService.findUpdatedSince(date);
  }
}
