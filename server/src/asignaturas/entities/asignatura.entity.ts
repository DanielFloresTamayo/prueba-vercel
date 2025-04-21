import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Anuncio } from '../../anuncios/entities/anuncio.entity';  // Relación con los anuncios

@Entity('asignaturas')
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number; // ID de la asignatura

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string; // Nombre de la asignatura

  @OneToMany(() => Anuncio, (anuncio) => anuncio.asignatura, { cascade: true })
  anuncios: Anuncio[]; // Relación con los anuncios
}
