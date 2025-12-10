import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

interface LoginResponse {
  token: string;
  rol: string;
  mensaje?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000/usuarios';
  private token: string | null = null;

  constructor(private http: HttpClient) {

  }

 
  logout(): void {
    // Limpiar token y localStorage
    localStorage.removeItem('token');
    this.token = null;
    console.log('Sesión cerrada exitosamente');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);

    if (error.status === 0) {
      return throwError(() => 'Error de conexión. Por favor, verifica tu conexión.');
    }

    switch (error.status) {
      case 400:
        return throwError(() => 'Datos incorrectos. Por favor, verifica la información ingresada.');
      case 401:
        return throwError(() => 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
      case 403:
        return throwError(() => 'Acceso denegado. No tienes permisos para realizar esta acción.');
      case 404:
        return throwError(() => 'Recurso no encontrado.');
      case 500:
        return throwError(() => 'Error en el servidor. Por favor, intenta más tarde.');
      default:
        return throwError(() => 'Error inesperado. Por favor, intenta nuevamente.');
    }
  }
}