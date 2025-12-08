import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clase } from '../../models/clase.model';
import { Resena } from '../../models/resena.model'; // suponiendo que tienes un modelo de reseñas
import { Cita } from '../../models/cita.model';



@Injectable({
  providedIn: 'root'
})
export class ParticipanteDashboardService {
  private apiUrl = 'http://localhost:3000/participantes'; // API de participantes
  private apiUrlClases = 'http://localhost:3000/clases';
  private apiUrlResenas = 'http://localhost:3000/resenas';
  private apiUrlCitas = 'http://localhost:3000/citas';

  constructor(private http: HttpClient) { }

  // ✅ Obtener participante por ID
  getParticipanteById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  // 🔹 Obtener información del tutor por ID
  getTutorById(id: string) {
    return this.http.get<any>(`http://localhost:3000/tutors/${id}`);
  }

  // ✅ Actualizar contraseña del participante
  updateParticipantePassword(id: number, hashedPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { contrasena: hashedPassword });
  }

  // 🔹 Obtener todas las clases con la información del tutor expandida
  getClasesConTutor(): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${this.apiUrlClases}?_expand=tutor`);
  }



  // 🔹 Obtener clases inscritas por participante (opcional)
  getClasesByParticipante(participanteId: number): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${this.apiUrlClases}?participanteId=${participanteId}`);
  }


  // 🔹 Obtener reseñas del participante
  getResenasByParticipante(participanteId: number): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrlResenas}?participanteId=${participanteId}`);
  }

  // 🔹 Crear reseña (POST)
  createResena(data: Resena): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrlResenas, data);
  }

  // 🔹 Actualizar reseña (PATCH)
  updateResena(id: number, data: Partial<Resena>): Observable<Resena> {
    return this.http.patch<Resena>(`${this.apiUrlResenas}/${id}`, data);
  }

  // 🔹 Eliminar reseña (DELETE)
  deleteResena(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlResenas}/${id}`);
  }


  //CITAS

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrlCitas);
  }

  getCitasByClase(claseId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrlCitas}?claseId=${claseId}`);
  }
//traer toda la cita con el participante, tutor y clase
 getCitasByParticipante(participanteId: number) {
  return this.http.get<any[]>(`${this.apiUrlCitas}?participanteId=${participanteId}&_expand=tutor&_expand=clase`);
}

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrlCitas, cita);
  }

  cancelarCita(idCita: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlCitas}/${idCita}`);
  }

  
}
