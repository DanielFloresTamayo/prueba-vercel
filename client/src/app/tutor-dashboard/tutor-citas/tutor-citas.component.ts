import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorDashboardService } from '../services/tutor-dashboard.service';

@Component({
  selector: 'app-tutor-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutor-citas.component.html',
  styleUrls: ['./tutor-citas.component.css']
})
export class TutorCitasComponent implements OnInit {

  citas: any[] = [];
  tutorId!: number;
  cargando = true;
  //estadoFiltro: string = 'todas';
  citasFiltradas: any[] = [];
  filtroEstado: string = 'todas';


  constructor(private dashboardService: TutorDashboardService) { }

  ngOnInit(): void {
    this.obtenerTutor();
    this.cargarCitas();
  }

  /** 1️⃣ Leer tutor logueado desde localStorage */
  obtenerTutor(): void {
    const storedUser = localStorage.getItem('usuario');

    if (!storedUser) {
      console.warn('⚠ No hay usuario en localStorage');
      return;
    }

    const userData = JSON.parse(storedUser);

    if (userData.tipo !== 'tutor') {
      console.warn('⚠ El usuario logueado no es tutor');
      return;
    }

    this.tutorId = userData.id;
  }

  /** 2️⃣ Obtener citas del backend */
  cargarCitas(): void {
    if (!this.tutorId) return;

    this.dashboardService.getCitasByTutor(this.tutorId).subscribe({
      next: (data) => {
        this.citas = data.sort((a, b) =>
          new Date(b.fechaSolicitud).getTime() -
          new Date(a.fechaSolicitud).getTime()
        );
        //this.citas = data;
        this.citasFiltradas = [...this.citas];
        this.cargando = false;

      },
      error: () => {

        this.cargando = false;
      }
    });


  }

  filtrarPorEstado(estado: string): void {
    this.filtroEstado = estado;

    const nuevasCitas =
      estado === 'todas'
        ? [...this.citas]
        : this.citas.filter(cita => cita.estado === estado);

    // 🔥 FORZAR ANIMACIÓN DE ENTRADA
    nuevasCitas.forEach(cita => {
      cita._anim = false;
      setTimeout(() => (cita._anim = true), 10);
      setTimeout(() => (cita._anim = false), 150);
    }
  );

    this.citasFiltradas = nuevasCitas;
  }



  /** ACEPTAR CITA */
  aceptarCita(cita: any): void {


    if (!cita?.id) return;

    this.dashboardService.updateEstadoCita(cita.id, 'aceptada').subscribe({
      next: () => {
        cita.estado = 'aceptada'; // 🔥 Actualiza inmediatamente la UI
        cita._anim = true;
        setTimeout(() => cita._anim = false, 600);
        this.filtrarPorEstado(this.filtroEstado);

      },
      error: (err) => {
        console.error('Error al aceptar cita:', err);
      }
    });
  }

  /** RECHAZAR CITA */
  rechazarCita(cita: any): void {

    if (!cita?.id) return;

    this.dashboardService.updateEstadoCita(cita.id, 'rechazada').subscribe({
      next: () => {
        cita.estado = 'rechazada';
        cita._anim = true;
        setTimeout(() => cita._anim = false, 600);
        this.filtrarPorEstado(this.filtroEstado);

      },
      error: (err) => {
        console.error('Error al rechazar cita:', err);
      }
    });
  }

  /** MARCAR COMO COMPLETADA (futuro) */
  completarCita(cita: any): void {

    if (!cita?.id) return;

    this.dashboardService.updateEstadoCita(cita.id, 'completada').subscribe({
      next: () => {
        cita.estado = 'completada';
        cita._anim = true;
        setTimeout(() => cita._anim = false, 600);
        this.filtrarPorEstado(this.filtroEstado);

      },
      error: (err) => {
        console.error('Error al completar cita:', err);
      }
    });
  }


  trackByCita(index: number, cita: any) {
    return `${cita.id}-${this.filtroEstado}`;
  }



  getFechaRelativa(fecha: string): string {
    const fechaCita = new Date(fecha);
    const ahora = new Date();

    const diffMs = ahora.getTime() - fechaCita.getTime();
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDias = Math.floor(diffHoras / 24);

    if (diffHoras < 1) return 'Hace unos minutos';
    if (diffHoras < 24) return `Hace ${diffHoras} horas`;
    if (diffDias === 1) return 'Hace 1 día';
    return `Publicado hace ${diffDias} días`;
  }



}

