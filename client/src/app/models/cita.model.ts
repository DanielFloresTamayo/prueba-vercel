import { Tutor } from "./tutor.model";
import { Participante } from "./participante.model";
import { Clase } from "./clase.model";

export interface Cita {
  id?: number;                  // autoincremental de JSON Server
  tutorId: number;              // id del tutor (coincide con Tutor.id)
  participanteId: number;       // id del participante (coincide con Participante.id)
  claseId: number;              // id de la clase solicitada (coincide con Clase.id)

  fechaSolicitud: string;       // fecha de la solicitud en formato ISO (string)
  estado: 'pendiente' | 'completada'| 'rechazada'|'aceptada'; // estado de la cita
  mensaje?: string;    
  
  // Propiedades opcionales para poder expandir en Angular si se requiere
  tutor?: Tutor;
  participante?: Participante;
  clase?: Clase;
}
