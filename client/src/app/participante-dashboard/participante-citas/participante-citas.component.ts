import { Component, OnInit } from '@angular/core';
import { ParticipanteDashboardService } from '../services/participante-dashboard.services';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita.model';
import { Router } from '@angular/router';
import { Resena } from '../../models/resena.model';


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
  resenasMap: { [citaId: number]: Resena } = {};
  resenaVisible: { [id: number]: boolean } = {};

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

  
  toggleResena(id: number) {
    this.resenaVisible[id] = !this.resenaVisible[id];
  }

  cargarCitas() {

    this.citasService.getCitasByParticipante(this.userId).subscribe(data => {
      this.citas = data;

      data.forEach(cita => {
        if (cita.tieneResena) {
          this.citasService.getResenaByCita(cita.id!).subscribe(res => {
            if (res.length > 0) {
              this.resenasMap[cita.id!] = res[0];
            }
          });
        }
      });

    });
  }


  puedeDejarResena(cita: Cita): boolean {
    return cita.estado === 'completada' && !cita.tieneResena;
  }

  irAResena(citaId: number) {
    this.router.navigate(['/participante/resena', citaId]);
  }

}
