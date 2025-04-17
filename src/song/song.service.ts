import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { Verse } from './entities/verse.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongService {
  [x: string]: any;
  constructor(
    @InjectRepository(Song)
    private _songRepository: Repository<Song>
  ) {}

  async create(createSongDto: CreateSongDto) {

    try{
      const { verses, chorus, ...songData } = createSongDto;

      const nextId = await this._songRepository.maximum('number');
      
      if (!nextId) {
        songData.number = 1;
        console.log("No hay canciones en el sistema");
      } else {
        songData.number = nextId + 1;
        console.log("Si hay canciones en el sistema");
      }
  
      const song = this._songRepository.create({...songData,chorus,});
      song.verses = verses.map((text) => {
        const verse = new Verse();
        verse.text = text.text;
        return verse;
      });
      return await this._songRepository.save(song);
    }catch(e) {
      console.log(e);
    }
    
  }

  async findAll() {
    const res = await this._songRepository.find({ relations: ['verses'] });

    if (!res) {
      const result = {message: "No hay canciones en el sistema", status: 404};
      return result;
    }

    res.forEach((song) => {
      const versesText = song.verses.map((verse) => verse.text);
      (song as any).verses = versesText;
    });

    return res;
  }

  async findByTypeCoro(type_coro: number) {

    try {
      const res = await this._songRepository.find({ where: { typeCoro: type_coro as any }, relations: ['verses'] });
  
    if (!res.length) {
      const result = {message: "No hay canciones con el tipo de coro especificado", status: 404};
      return result;
    }
  
    res.forEach((song) => {
      const versesText = song.verses.map((verse) => verse.text);
      (song as any).verses = versesText;
    });

    return res;

    }catch(e) {
      console.log(e);
    }    
  }

  async createBulk(createSongsDto: CreateSongDto[]) {
    console.log('Iniciando la inserción en lotes...');
    
    const chunkSize = 500; // Puedes ajustar el tamaño según sea necesario
    const chunks = [];
    
    // Dividir los datos en lotes
    for (let i = 0; i < createSongsDto.length; i += chunkSize) {
      chunks.push(createSongsDto.slice(i, i + chunkSize));
    }
    
    console.log(`Se dividieron los datos en ${chunks.length} lotes.`);
    
    // Comenzar la inserción en lotes
    for (const chunk of chunks) {
      console.log(`Insertando lote de ${chunk.length} canciones...`);
      await this._songRepository.save(chunk);
    }
    
    console.log('Inserción completada.');
    return { message: 'Songs inserted successfully' };
  }
  
  
}