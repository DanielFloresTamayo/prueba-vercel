import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resena } from '../../models/resena.model';
import { TutorDashboardService } from '../services/tutor-dashboard.service';

@Component({
  selector: 'app-tutor-resenas',
  imports: [CommonModule],
  templateUrl: './tutor-resenas.component.html',
  styleUrl: './tutor-resenas.component.css'
})
export class TutorResenasComponent {
  resenas: Resena[] = [];
  loading = true;

  constructor(
    private tutorDashboardService: TutorDashboardService
  ) { }

   ngOnInit(): void {
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) {
      this.loading = false;
      return;
    }

    const tutorId = JSON.parse(storedUser).id;

    this.tutorDashboardService
      .getResenasByTutorConParticipante(tutorId)
      .subscribe({
        next: (res) => {
          this.resenas = res
            .sort((a, b) => {
              const fechaA = new Date(a.fecha!).getTime();
              const fechaB = new Date(b.fecha!).getTime();
              return fechaB - fechaA; 
            })


            .slice(0, 3); 
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  getFechaRelativa(fecha: string): string {
    const fechaResena = new Date(fecha);
    const hoy = new Date();

    const diffMs = hoy.getTime() - fechaResena.getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias === 0) return 'Hoy';
    if (diffDias === 1) return 'Hace 1 día';
    if (diffDias < 7) return `Hace ${diffDias} días`;
    if (diffDias < 30) return `Hace ${Math.floor(diffDias / 7)} semanas`;

    return fechaResena.toLocaleDateString();
  }


}
