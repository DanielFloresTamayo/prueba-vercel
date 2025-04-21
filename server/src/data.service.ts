import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      // Verificar que la conexión esté activa
      await this.dataSource.query('SELECT 1');  // Comando simple de verificación
      console.log('✔️ Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
    }
  }
}
