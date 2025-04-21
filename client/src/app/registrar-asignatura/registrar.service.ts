import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AsignaturasService {
  private baseUrl = 'http://localhost:3000/asignaturas'; // Cambiar si tu backend tiene otra URL base

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Obtener todas las asignaturas
  getAsignaturas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  // Crear nueva asignatura
  createAsignatura(nombre: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { nombre }, { headers: this.getHeaders() });
  }

  // Actualizar asignatura
  updateAsignatura(id: number, nombre: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, { nombre }, { headers: this.getHeaders() });
  }

  // Eliminar asignatura
  deleteAsignatura(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
