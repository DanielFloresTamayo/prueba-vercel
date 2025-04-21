import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Anuncio } from '../../anuncios/entities/anuncio.entity';
//import { ClaseParticular } from '../../clases_particulares/entities/clases_particulare.entity';
//import { Comentario } from '../../comentarios/entities/comentario.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: string;

  @Column({
    type: 'enum',
    enum: ['Administrador', 'Tutor', 'Participante'],
  })
  rol: 'Administrador' | 'Tutor' | 'Participante';

  @Column({ type: 'varchar', length: 100, nullable: true })
  carrera: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  numero_contacto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  foto: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean; // El campo que indica si el usuario está activo o no

  @Column({ type: 'varchar', length: 100, nullable: true })
  nivel_academico: string;


  @OneToMany(() => Anuncio, (anuncio) => anuncio.tutor)
  anuncios: Anuncio[];


}



// @OneToMany(() => ClaseParticular, (clase) => clase.participante)
//clasesParticulares: ClaseParticular[];

//@OneToMany(() => Comentario, (comentario) => comentario.tutor)
//comentariosRecibidos: Comentario[];

//@OneToMany(() => Comentario, (comentario) => comentario.participante)
//comentariosDejados: Comentario[];


