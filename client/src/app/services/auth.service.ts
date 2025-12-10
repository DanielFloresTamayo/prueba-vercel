import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  logout(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const datos = JSON.parse(usuario);
   //   console.log(`👋 Se cerró sesión con el tutor: ${datos.apellidos} ${datos.nombres}`);
    }
    localStorage.clear();

    localStorage.removeItem('usuario');

    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente, Vuelve pronto.',
      showConfirmButton: false,
      timer: 1800
    });

    this.router.navigate(['/login']);
  }
}
