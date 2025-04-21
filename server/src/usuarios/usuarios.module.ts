import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { AuthService } from '../auth/auth.service';
import { UsuarioController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), AuthModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, AuthService],
})
export class UsuariosModule {}
