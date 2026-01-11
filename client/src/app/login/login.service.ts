import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://mi-json-backend.onrender.com/api'; // tu JSON server

  constructor(private http: HttpClient) {}

getParticipanteByCorreo(correo: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/participantes?correoPersonal=${correo}`);
}

getTutorByCorreo(correo: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/tutors?correoInstitucional=${correo}`);
}

}
