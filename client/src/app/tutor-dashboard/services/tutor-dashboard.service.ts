import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clase } from '../../models/clase.model';
import { Resena } from '../../models/resena.model';

@Injectable({
  providedIn: 'root'
})
export class TutorDashboardService {
  private apiUrl = 'https://grateful-essence-production-2233.up.railway.app/tutors'; // o "usuarios", según tu JSON Server
  private apiUrlClases = 'https://grateful-essence-production-2233.up.railway.app/clases';
  private apiUrlResenas = 'https://grateful-essence-production-2233.up.railway.app/resenas';

  constructor(private http: HttpClient) { }

 
  getTutorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  
  updateTutorProfile(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }


  updateTutorPassword(id: number, hashedPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { contrasena: hashedPassword });
  }


  createClase(data: Clase): Observable<Clase> {
    return this.http.post<Clase>(this.apiUrlClases, data);
  }

  getClasesByTutor(tutorId: number): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${this.apiUrlClases}?tutorId=${tutorId}`);
  }

  updateClase(id: number, data: Partial<Clase>): Observable<Clase> {
    return this.http.patch<Clase>(`${this.apiUrlClases}/${id}`, data);
  }

  deleteClase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlClases}/${id}`);
  }


  getCitasByTutor(tutorId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://grateful-essence-production-2233.up.railway.app/citas?tutorId=${tutorId}&_expand=participante&_expand=clase`);
  }


  updateEstadoCita(id: number, estado: string): Observable<any> {
    return this.http.patch(`https://grateful-essence-production-2233.up.railway.app/citas/${id}`, { estado });
  }



  getResenasByTutorConParticipante(tutorId: number): Observable<Resena[]> {
    return this.http.get<Resena[]>(
      `${this.apiUrlResenas}?tutorId=${tutorId}&_expand=participante&_sort=fecha&_order=desc`
    );
  }

}
