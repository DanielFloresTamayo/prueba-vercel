import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-tutor-dashboard',
  standalone: true, // 👈 IMPORTANTE si no lo tienes aún
  imports: [CommonModule, RouterModule], // 👈 agrega estos módulos
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.css']
})
export class TutorDashboardComponent {
  isSidebarOpen = false;
  submenuClases: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
 /* abrirCrearClase() {
    localStorage.setItem('modoClase', 'crear'); // 👉 comunica al otro componente
  }

  abrirMisClases() {
    localStorage.setItem('modoClase', 'listar'); // 👉 limpia edición
  }*/

}
