import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization
      ignoreExpiration: false,// Rechaza tokens expirados
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    console.log('🔑 JwtStrategy inicializada con secret:', configService.get<string>('JWT_SECRET'));
  }

  async validate(payload: any) {
    console.log('🔍 Validando token. Payload recibido:', payload);
    // Aquí se pueden agregar validaciones adicionales (por ejemplo, comprobar si el usuario sigue activo)
    return { userId: payload.sub, correo: payload.correo, rol: payload.rol };
  }
}
