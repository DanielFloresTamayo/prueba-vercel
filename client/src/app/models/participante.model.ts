
export interface Participante {
  id?: number;             // asignado por json-server
  nombres: string;
  apellidos: string;
  correoPersonal: string;
  contrasena: string;
  resenas?: number[];
}
