import { Exclude, Expose } from 'class-transformer';

export class UsuarioListadoDto {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  apellido: string;

  @Expose()
  correo: string;

  @Expose()
  rol: 'Administrador' | 'Tutor' | 'Participante';
}
