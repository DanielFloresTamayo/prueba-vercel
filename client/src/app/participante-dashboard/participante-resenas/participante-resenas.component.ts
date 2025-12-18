import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ParticipanteDashboardService } from '../services/participante-dashboard.services';
import { Cita } from '../../models/cita.model';



@Component({
  selector: 'app-participante-resenas',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './participante-resenas.component.html',
  styleUrl: './participante-resenas.component.css'
})
export class ParticipanteResenasComponent {

  comentario: string = '';
  tutorNombre: string = '';
  citaId!: number;
  cita!: Cita;
  userId!: number;
  accesoValido: boolean = false;

  enviando: boolean = false;
  enviado: boolean = false;
  error: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private dashboardService: ParticipanteDashboardService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) {
      this.router.navigate(['/participante/citas']);
      return;
    }

    this.userId = JSON.parse(storedUser).id;
    this.citaId = Number(this.route.snapshot.paramMap.get('citaId'));

    if (!this.citaId) {
      this.router.navigate(['/participante/citas']);
      return;
    }

    this.validarCita();
  }

  validarCita(): void {
    this.dashboardService.getCitasByParticipante(this.userId).subscribe(citas => {
      const citaEncontrada = citas.find(c => c.id === this.citaId);

      if (
        !citaEncontrada ||
        citaEncontrada.estado !== 'completada' ||
        citaEncontrada.tieneResena === true
      ) {
        this.router.navigate(['/participante/citas']);
        return;
      }

      // ✅ Cita válida
      this.cita = citaEncontrada;
      this.tutorNombre = `${citaEncontrada.tutor?.nombres} ${citaEncontrada.tutor?.apellidos}`;
      this.accesoValido = true;
    });
  }

  enviarResena(): void {
    if (!this.comentario.trim() || !this.cita?.id) return;
    // if (!this.cita || this.cita.id === undefined) return;
    this.enviando = true;

    const nuevaResena = {
      citaId: this.cita.id,
      tutorId: this.cita.tutorId,
      participanteId: this.userId,
      comentario: this.comentario.trim(),
      fecha: new Date().toISOString()
    };


    this.dashboardService.createResena(nuevaResena).subscribe({
      next: () => {

        this.dashboardService
          .updateCitaTieneResena(this.cita.id!)
          .subscribe({
            next: () => {
              this.enviando = false;
              this.enviado = true;
              setTimeout(() => {
                this.router.navigate(['/participante/citas']);
              }, 2500);

            }, error: () => {
              this.enviando = false;
              this.error = 'No se pudo actualizar la cita.';
            }
          });
      },
      error: () => {
        this.enviando = false;
        this.error = 'No se pudo enviar la reseña. Intenta nuevamente.';
      }
    });
  }

  /*
  
    cargarCita() {
      this.dashboardService.getCitas().subscribe(citas => {
        this.cita = citas.find(c => c.id === this.citaId)!;
      });
    }
  */
}
