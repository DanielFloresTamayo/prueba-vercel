import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Asignatura } from '../../asignaturas/entities/asignatura.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('anuncios')
export class Anuncio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => Asignatura, (asignatura) => asignatura.anuncios)
  asignatura: Asignatura;  // Relación con la asignatura

  @ManyToOne(() => Usuario, (usuario) => usuario.anuncios)
  tutor: Usuario;  // Relación con el tutor
}
