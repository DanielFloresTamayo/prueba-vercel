import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail({}, { message: 'El correo debe ser un correo válido' })
  correo: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
