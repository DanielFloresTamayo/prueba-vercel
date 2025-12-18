import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipanteDashboardService } from '../services/participante-dashboard.services';
import { Clase } from '../../models/clase.model';
import { Cita } from '../../models/cita.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-participante-clases',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule],
  templateUrl: './participante-clases.component.html',
  styleUrls: ['./participante-clases.component.css']
})
export class ParticipanteClasesComponent implements OnInit {

  clases: Clase[] = [];
  loading = true;
  mensaje: string | null = null;

  participanteId = Number(localStorage.getItem('userId'));

  constructor(private participanteService: ParticipanteDashboardService) { }

  ripple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rippleSpan = document.createElement('span');
    rippleSpan.classList.add('ripple');
    rippleSpan.style.left = `${event.offsetX}px`;
    rippleSpan.style.top = `${event.offsetY}px`;
    button.appendChild(rippleSpan);

    setTimeout(() => rippleSpan.remove(), 600);
  }

  getFechaRelativa(fecha: string): string {
    const fechaPublicacion = new Date(fecha);
    const ahora = new Date();

    const diffMs = ahora.getTime() - fechaPublicacion.getTime();
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDias = Math.floor(diffHoras / 24);

    if (diffHoras < 1) return 'Publicado hace unos minutos';
    if (diffHoras < 24) return `Publicado hace ${diffHoras} horas`;
    if (diffDias === 1) return 'Publicado hace 1 día';
    return `Publicado hace ${diffDias} días`;
  }


  ngOnInit(): void {
    this.participanteService.getClasesConTutor().subscribe({
      next: (data) => {
        this.clases = data;
        this.loading = false;
      },
      error: () => {
        console.error("Error cargando clases.");
        this.loading = false;
      }
    });
  }

  agendar(clase: Clase) {

    const usuarioData = JSON.parse(localStorage.getItem('usuario')!);
    this.participanteId = usuarioData?.id;


    const nuevaCita: Cita = {
      tutorId: clase.tutorId,
      participanteId: this.participanteId,
      claseId: clase.id!,
      fechaSolicitud: new Date().toISOString(),
      estado: 'pendiente',
      mensaje: '',   // opcional
      tieneResena: false
    };

    this.participanteService.crearCita(nuevaCita).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          html: `
    <b>Cita registrada.</b><br>
    Contacta al tutor con los datos de la clase para coordinar la hora, precios.
  `,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
        });

      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar la cita.',
          confirmButtonColor: '#d33'
        });
      }
    });

  }
}
