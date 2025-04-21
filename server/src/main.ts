import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir peticiones desde el frontend
  });

  // Servir archivos estáticos (ej. imágenes de perfil)
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // Obtener configuración desde ConfigService
  const configService = app.get(ConfigService);
  console.log('🔑 JWT_SECRET:', configService.get<string>('JWT_SECRET'));

  // Iniciar el servidor en el puerto especificado o en el 3000 por defecto
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
}

bootstrap();
