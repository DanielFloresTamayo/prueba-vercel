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

  constructor(private dashboardService: TutorDashboardService) {}

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
        this.citas = data;
        this.cargando = false;
       // console.log('📌 Citas cargadas:', this.citas);
      },
      error: (err) => {
        console.error('❌ Error al obtener citas:', err);
        this.cargando = false;
      }
    });
  }
}

