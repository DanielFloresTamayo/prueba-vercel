
  import { IsString, IsEmail, IsOptional, IsEnum, IsDateString } from 'class-validator';


  export class CreateUsuarioDto {
    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsEmail()
    correo: string;

    @IsString()
    password: string;
  
    @IsOptional() // Solo se valida si es necesario
    @IsDateString()
    fecha_nacimiento?: string; // La fecha puede ser opcional

    @IsEnum(['Administrador', 'Tutor', 'Participante'])
    rol: 'Administrador' | 'Tutor' | 'Participante';

    @IsOptional() // Campos opcionales
    @IsString()
    carrera?: string;

    @IsOptional()
    @IsString()
    numero_contacto?: string;

    @IsOptional()
    @IsString()
    foto?: string;

    @IsOptional()
    @IsString()
    nivel_academico?: string;   
  }

