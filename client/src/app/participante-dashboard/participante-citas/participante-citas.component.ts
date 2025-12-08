import { Component, OnInit } from '@angular/core';
import { ParticipanteDashboardService } from '../services/participante-dashboard.services';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-participante-citas',
  standalone: true,
  imports: [
    CommonModule // <-- IMPORTANTE PARA ngFor, ngIf Y PIPE DATE
  ],
  templateUrl: './participante-citas.component.html',
  styleUrls: ['./participante-citas.component.css']
})
export class ParticipanteCitasComponent implements OnInit {

  citas: any[] = [];
  userId!: number;

  constructor(private citasService: ParticipanteDashboardService) { }

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

}
