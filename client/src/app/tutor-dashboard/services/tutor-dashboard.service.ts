import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clase } from '../../models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class TutorDashboardService {
  private apiUrl = 'http://localhost:3000/tutors'; // o "usuarios", según tu JSON Server
  private apiUrlClases = 'http://localhost:3000/clases';

  constructor(private http: HttpClient) { }

  // ✅ OBTENER tutor por ID
  getTutorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✅ ACTUALIZAR perfil del tutor
  updateTutorProfile(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  // ✅ ACTUALIZAR contraseña
  updateTutorPassword(id: number, hashedPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { contrasena: hashedPassword });
  }

  // 🔹 Crear una clase (POST)
  createClase(data: Clase): Observable<Clase> {
    return this.http.post<Clase>(this.apiUrlClases, data);
  }

  // 🔹 Obtener clases por tutor
  getClasesByTutor(tutorId: number): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${this.apiUrlClases}?tutorId=${tutorId}`);
  }

  // 🔹 Actualizar clase (PATCH)
  updateClase(id: number, data: Partial<Clase>): Observable<Clase> {
    return this.http.patch<Clase>(`${this.apiUrlClases}/${id}`, data);
  }

  // 🔹 Eliminar clase (DELETE)
  deleteClase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlClases}/${id}`);
  }


  // =========================
  //  Citas del tutor
  // =========================

  // GET citas según el tutor (expand participante y clase)
  getCitasByTutor(tutorId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/citas?tutorId=${tutorId}&_expand=participante&_expand=clase`);
  }


  // PATCH para cambiar estado (aceptar/rechazar/completada)
  updateEstadoCita(id: number, estado: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/citas/${id}`, { estado });
  }

  // (opcional) otros métodos futuros como getClases, getComentarios, etc.
}
