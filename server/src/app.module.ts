import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './data.service';
/*import { AnuncioModule } from './anuncio/anuncio.module';
import { ClasesParticularesModule } from './clases_particulares/clases_particulares.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { ClaseParticular } from './clases_particulares/entities/clases_particulare.entity';
import { Comentario } from './comentarios/entities/comentario.entity';*/
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Asignatura } from './asignaturas/entities/asignatura.entity';
import { AsignaturasModule } from './asignaturas/asignaturas.module';
import { AnunciosModule } from './anuncios/anuncios.module';
import { Anuncio } from './anuncios/entities/anuncio.entity';
import { ClasesParticularesModule } from './clases_particulares/clases_particulares.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';




@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true, // Hace las variables accesibles en toda la aplicación
      envFilePath: '.env', // Asegura que se cargue el archivo .env
    }),
    // Configuración del ServeStaticModule para servir archivos estáticos desde 'public'
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // localhost
      port: 3305, // Puerto MySQL
      username: 'root',
      password: 'Root1234!',
      database: 'bdd_clases', // Nombre de la base de datos
      entities: [Usuario, Asignatura, Anuncio/*, ClaseParticular, Comentario*/], // 
      synchronize: true, // Cambia a "true" solo en desarrollo
      logging: true
    }),

    TypeOrmModule.forFeature([Usuario, Asignatura, Anuncio/*, ClaseParticular, Comentario*/]),
    UsuariosModule,
    AsignaturasModule,
    AnunciosModule,
    ClasesParticularesModule,
    /*ClasesParticularesModule,
    ComentariosModule,*/
    PassportModule,

    JwtModule.register({
      global: true, // Permite usar JWT en toda la app
      secret: process.env.JWT_SECRET || 'jwt-secret-key', // Clave secreta del JWT
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' }, // Tiempo de expiración del token
    }),



  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService, JwtStrategy,

    /**{
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard, // Registra el guardia globalmente
    },*/
  ],


})
export class AppModule { }
