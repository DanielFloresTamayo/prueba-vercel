
export interface Tutor {
  id?: number;             // asignado por json-server
  nombres: string;
  apellidos: string;
  correoInstitucional: string;
  nivelAcademico: string;
  fechaNacimiento: string; // formato YYYY-MM-DD (string)
  contrasena: string;
  numeroContacto?: string;
  carrera?: string;
  foto?: string;           // ruta o URL a la imagen
  clases?: number[];
  resenas?: number[];  // array embebido de reseñas
}
