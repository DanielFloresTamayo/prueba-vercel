import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
    private readonly configService: ConfigService
  ) {
    console.log('🔑 JWT_SECRET desde ConfigService:',
      this.configService.get<string>('JWT_SECRET'));
    console.log('🛡️ AuthService inicializado.');
  }

  async login(loginUsuarioDto: { correo: string; password: string }) {
    console.log('➡ Recibiendo credenciales:', loginUsuarioDto); // 🟢 LOG 1: Ver credenciales recibidas

    // Buscar usuario por correo
    const usuario = await this.usuarioService.findByEmail(loginUsuarioDto.correo);
    console.log('🔎 Usuario encontrado:', usuario); // 🟢 LOG 2: Ver usuario encontrado


    if (!usuario) {
      console.error('❌ Usuario no encontrado.');
      throw new UnauthorizedException('Credenciales incorrectas.');
    }
    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(loginUsuarioDto.password, usuario.password);
    console.log('🔐 ¿Contraseña válida?:', isPasswordValid); // 🟢 LOG 3: Ver resultado de la comparación


    if (!isPasswordValid) {
      console.error('❌ Contraseña incorrecta.');
      throw new UnauthorizedException('Credenciales incorrectas.');
    }
    // Generar payload del token
    const payload = { sub: usuario.id, correo: usuario.correo, rol: usuario.rol };
    //console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('🛠️ Generando token con payload:', payload); // 🟢 LOG 4: Ver payload antes de firmar el token



    // Obtener JWT_SECRET desde ConfigService
    const secretKey = this.configService.get<string>('JWT_SECRET');
    if (!secretKey) {
      console.error('❌ JWT_SECRET no está definido. Revisa tu configuración.');
      throw new Error('JWT_SECRET no está configurado.');
    }

    // Firmar y devolver el token
    const token = this.jwtService.sign(payload, { secret: secretKey }); // ✅ Usar la clave secreta
    console.log('✅ Token generado:', token);

    return { token };
  }
}
