// src/usuarios/dto/update-usuario.dto.ts
import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres.' })
  nombre?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'El apellido debe tener entre 2 y 50 caracteres.' })
  apellido?: string;
  
  @IsOptional()
  activo?: boolean;
  
  @IsOptional()
  @IsString()
  foto?: string;
}
