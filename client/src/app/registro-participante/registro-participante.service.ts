import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroParticipanteService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL base del backend

  constructor(private http: HttpClient,private authService: AuthService) { }


  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Método para obtener todos los usuarios
  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener usuarios:', error);
        return throwError(() => error);
      })
    );
  }

  // Método para cambiar el estado de un usuario (activar/desactivar)
  cambiarEstadoUsuario(id: number, estado: boolean): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    const body = { activo: estado };
    return this.http.patch(url, body, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al cambiar el estado del usuario:', error);
        return throwError(() => error);
      })
    );
  }


  // Método para eliminar un usuario
 /* eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al eliminar usuario:', error);
        return throwError(() => error);
      })
    );
  }*/

  // Método para actualizar un usuario
  actualizarUsuario(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch(url, data, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al actualizar usuario:', error);
        return throwError(() => error);
      })
    );
  }


  // Método para registrar un participante
  registrarParticipante(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error capturado en el servicio:', error);
        return throwError(() => error);
      })
    );
  }

  // Método para registrar un tutor
  registrarTutor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-tutor`, data, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error capturado en el servicio:', error);
        return throwError(() => error);
      })
    );
  }
}
