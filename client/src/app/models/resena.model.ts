export interface Resena {
    id?: number;
    tutorId: number;
    participanteId: number | null;
    comentario: string;
    fecha?: string;
}
