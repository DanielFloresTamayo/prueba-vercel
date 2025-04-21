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
  private apiUrl = 'http://localhost:3000/usuarios';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Intentar recuperar el token al iniciar el servicio
    this.token = localStorage.getItem('token');
    if (this.token) {
      console.log('Token recuperado al iniciar el servicio:', this.token);
      console.log('Token decodificado:', this.decodeToken());
    }
  }

  login(correo: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;
    const body = { correo, password };

    console.log('Intentando login con:', { correo });

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(response => {
        if (response.token) {
          // Guardar token en el servicio y localStorage
          //this.token = response.token;
          this.setToken(response.token);
          console.log('Token guardado exitosamente');
          // Decodificar el token para extraer información y mostrarlo en consola
          const decoded = this.decodeToken();
          console.log('Token decodificado:', decoded);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Limpiar token y localStorage
    localStorage.removeItem('token');
    this.token = null;
    console.log('Sesión cerrada exitosamente');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Headers para peticiones autenticadas
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /** 🔹 Encapsula la lógica de guardar el token */
  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  /*
 Lee y decodifica el token almacenado.
 Esto permite extraer la información (por ejemplo, el rol)
 que luego se puede utilizar para redirigir al usuario o controlar accesos.
 Decodifica el token almacenado y devuelve su contenido.
*/
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      const decoded = jwt_decode(token);
      //const decoded = (jwt_decode as any).default(token);
      //console.log('Token decodificado:', decoded);
      return decoded;
    } else {
      console.warn('No se encontró token para decodificar.');
      return null;
    }
  }

  /**
 * Método de conveniencia para obtener el objeto decodificado.
 */
  getDecodedToken(): any {
    return this.decodeToken();
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