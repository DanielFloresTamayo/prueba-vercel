import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Participante } from '../models/participante.model';

@Injectable({
  providedIn: 'root',
})
export class RegistroParticipanteService {
  private apiUrl = `${environment.apiUrl}/participantes`;

  constructor(private http: HttpClient) {}

  // Obtener todos los participantes (para validar correos duplicados)
  obtenerParticipantes(): Observable<Participante[]> {
    return this.http.get<Participante[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Registrar un nuevo participante
  registrarParticipante(data: Participante): Observable<Participante> {
    return this.http.post<Participante>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud HTTP:', error);
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud.'));
  }


}
