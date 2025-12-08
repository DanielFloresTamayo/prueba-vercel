import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ParticipanteDashboardService } from '../participante-dashboard/services/participante-dashboard.services';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-participante-change-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './participante-dashboard.component.html',
  styleUrls: ['./participante-dashboard.component.css']
})
export class ParticipanteDashboardComponent {
  isSidebarOpen = false;
  user: any;

  constructor(
    private participanteDashboardService: ParticipanteDashboardService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.tipo === 'participante' && usuario.id) {
      const id = Number(usuario.id);
      this.participanteDashboardService.getParticipanteById(id).subscribe(
        data => this.user = data,
        err => {
          console.error('Error al cargar participante', err);
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
  }
}
