import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class CreateVerseDto {
  @IsString()
  text: string;
}

export class CreateSongDto {
  @IsNumber()
  id: number;

  @IsNumber()
  number: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  chorus?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVerseDto)
  verses: CreateVerseDto[];
}
