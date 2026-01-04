import { Tutor } from './tutor.model';

export interface FeaturedTutor {
  tutor: Tutor;
  ratingPromedio: number;
  totalResenas: number;
  citasCompletadas: number;
  verificado: boolean;
}
