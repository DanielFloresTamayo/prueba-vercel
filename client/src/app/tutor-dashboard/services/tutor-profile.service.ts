import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TutorProfileService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener perfil del tutor
  getTutorProfile(): Observable<any> {
    const headers: HttpHeaders = this.authService.getAuthHeaders();
    console.log('📤 Enviando solicitud GET con headers:', headers);
    return this.http.get(`${this.apiUrl}/perfil`, { headers });
  }

  // Actualizar número de contacto y carrera
  updateTutorProfile(updateData: any): Observable<any> {
    const headers: HttpHeaders = this.authService.getAuthHeaders();
    console.log('📤 Enviando solicitud PATCH con headers:', headers);
    return this.http.patch(`${this.apiUrl}/perfil/contacto`, updateData, { headers });
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const headers: HttpHeaders = this.authService.getAuthHeaders();
    console.log('Enviando POST /usuarios/upload con FormData y headers:', headers);
    return this.http.post(`${this.apiUrl}/upload`, formData, { headers });
  }
}
