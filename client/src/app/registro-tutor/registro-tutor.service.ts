import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Tutor } from '../models/tutor.model';

@Injectable({
  providedIn: 'root',
})
export class RegistroTutorService {
  private apiUrl = `${environment.apiUrl}/tutors`;

  constructor(private http: HttpClient) { }

  // Obtener todos los tutores (para verificar duplicados)
  obtenerTutores(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Registrar un nuevo tutor
  registrarTutor(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.apiUrl, tutor).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud HTTP:', error);
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud.'));
  }
}
