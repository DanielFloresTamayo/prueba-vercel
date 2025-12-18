import { Component, OnInit } from '@angular/core';
import { ParticipanteDashboardService } from '../services/participante-dashboard.services';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-participante-citas',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './participante-citas.component.html',
  styleUrls: ['./participante-citas.component.css']
})
export class ParticipanteCitasComponent implements OnInit {

  citas: Cita[] = [];

  userId!: number;

  constructor(
    private citasService: ParticipanteDashboardService, 
    private router: Router) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      this.userId = JSON.parse(storedUser).id;
    }

    this.cargarCitas();
  }

  cargarCitas() {

    this.citasService.getCitasByParticipante(this.userId).subscribe(data => {
      this.citas = data;
    });
  }
  puedeDejarResena(cita: Cita): boolean {
    return cita.estado === 'completada' && !cita.tieneResena;
  }

  irAResena(citaId: number) {
    this.router.navigate(['/participante/resena', citaId]);
  }

}
