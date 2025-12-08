import { Tutor } from "./tutor.model";

export interface Clase {
  id?: number;
  tutorId: number;
  titulo: string;
  materia: string;
  descripcion: string;
  fechaPublicacion: string;

  tutor?: Tutor;
}
