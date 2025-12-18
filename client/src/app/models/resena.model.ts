import { Participante } from "./participante.model";

export interface Resena {
    id?: number;
    citaId: number;  
    tutorId: number;
    participanteId: number | null;
    comentario: string;
    rating?: number;
    fecha?: string;

    participante?: Participante;
}
