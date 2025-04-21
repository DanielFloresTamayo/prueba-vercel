import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  carrera?: string;

  @IsOptional()
  @IsString()
  numero_contacto?: string;
}
