import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TutorDashboardService } from '../services/tutor-dashboard.service';
import { Clase } from '../../models/clase.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  vistaActual: 'crear' | 'editar' = 'crear';

  clase: Partial<Clase> = {
    titulo: '',
    materia: '',
    descripcion: ''
  };

  clases: Clase[] = [];

  // 🔥 NUEVO: para saber si vienes desde "editar clase"
  vengoDeEditar: boolean = false;

  materias: string[] = [
    'Matemáticas',
    'Física',
    'Programación',
    'Angular',
    'Inglés',
    'Electrónica',
    'Otros'
  ];

  constructor(
    private tutorService: TutorDashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vistaActual = params['vista'] || 'crear';

      // 🔥 SOLO limpiar si NO venimos desde "editar"
      if (this.vistaActual === 'crear' && !this.vengoDeEditar) {
        this.modoEdicion = false;
        this.idClaseEditando = null;
        this.clase = { titulo: '', materia: '', descripcion: '' };
      }

      // Si venimos desde editar, apagar el flag para la próxima navegación
      if (this.vengoDeEditar) {
        this.vengoDeEditar = false;
      }

      if (this.vistaActual === 'editar') {
        this.cargarClases();
      }
    });
  }

  cargarClases(): void {
    const usuario = localStorage.getItem('usuario');
    const tutorId = usuario ? JSON.parse(usuario).id : null;

    if (!tutorId) return;

    this.tutorService.getClasesByTutor(tutorId).subscribe({
      next: (data) => {
        this.clases = data;
        console.log("Clases del tutor:", data);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las clases.'
        });
      }
    });
  }

  modoEdicion: boolean = false;
  idClaseEditando: number | null = null;

  editarClase(clase: Clase): void {
    // 🔥 MARCAR que venimos desde EDITAR
    this.vengoDeEditar = true;

    this.modoEdicion = true;
    this.idClaseEditando = clase.id ?? null;

    this.clase = {
      titulo: clase.titulo,
      materia: clase.materia,
      descripcion: clase.descripcion
    };

    this.vistaActual = 'crear';
    this.router.navigate([], { queryParams: { vista: 'crear' } });

    console.log("Cargando datos de clase para edición:", this.clase);
  }

  eliminarClase(id: number): void {
    Swal.fire({
      title: '¿Eliminar clase?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,

      // 🧊 Estilo Apple / Glass
      background: 'rgba(255, 255, 255, 0.25)',
      color: '#000000ff',
      backdrop: `
      rgba(0,0,0,0.4)
      blur(6px)
    `,
      confirmButtonColor: '#ff3b30',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {

        this.tutorService.deleteClase(id).subscribe({
          next: () => {
            Swal.fire({
              title: "Clase eliminada",
              html: `<p>La clase fue eliminada correctamente.</p>`,
              //  timer: 8800,
              confirmButtonText: "OK",
              //icon: "success",
              background: 'rgba(255, 255, 255, 0.25)',
              color: '#000',
              backdrop: `
              rgba(0,0,0,0.4)
              blur(6px)
            `
            });

            // Recargar listado automáticamente
            this.cargarClases();
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la clase.',
              icon: 'error',
              background: 'rgba(255, 255, 255, 0.25)',
              color: '#000',
              backdrop: `
              rgba(0,0,0,0.4)
              blur(6px)
            `
            });
          }
        });

      }
    });
  }

  registrarClase(form: NgForm): void {
    const usuario = localStorage.getItem('usuario');
    const tutorId = usuario ? JSON.parse(usuario).id : null;

    if (!tutorId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el ID del tutor.'
      });
      return;
    }

    // MODO EDICIÓN
    if (this.modoEdicion && this.idClaseEditando) {
      const claseActualizada: Partial<Clase> = {
        titulo: this.clase.titulo!,
        materia: this.clase.materia!,
        descripcion: this.clase.descripcion!
      };

      this.tutorService.updateClase(this.idClaseEditando, claseActualizada).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Clase actualizada',
            text: 'Los cambios se han guardado correctamente.',
            timer: 2000,
            showConfirmButton: false
          });

          this.resetForm(form);
          this.modoEdicion = false;
          this.idClaseEditando = null;

          this.vistaActual = 'editar';
          this.router.navigate([], { queryParams: { vista: 'editar' } });
          this.cargarClases();
        },
        error: () => {
          Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar la clase.' });
        }
      });

      return;
    }

    // CREAR NUEVA CLASE
    const nuevaClase: Clase = {
      tutorId: tutorId,
      titulo: this.clase.titulo!,
      materia: this.clase.materia!,
      descripcion: this.clase.descripcion!,
      fechaPublicacion: new Date().toISOString().split('T')[0]
    };

    this.tutorService.createClase(nuevaClase).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Clase registrada',
          text: 'Tu clase ha sido publicada correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
        this.resetForm(form);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Ocurrió un problema al registrar la clase.'
        });
      }
    });
  }

  cancelarEdicion(form: NgForm): void {
    this.modoEdicion = false;
    this.idClaseEditando = null;

    this.resetForm(form);

    this.router.navigate([], { queryParams: { vista: 'crear' } });

    console.log("Cancelaste la edición → volvemos a modo crear.");
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.clase = { titulo: '', materia: '', descripcion: '' };
    this.modoEdicion = false;
    this.idClaseEditando = null;
  }
}
