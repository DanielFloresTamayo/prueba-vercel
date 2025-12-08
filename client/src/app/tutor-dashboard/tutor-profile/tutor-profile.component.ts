import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TutorDashboardService } from '../services/tutor-dashboard.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css'],
})
export class TutorProfileComponent implements OnInit {
  tutor: any = null;
  loading = true;
  mostrarFormulario = false;
  modoCompletar = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private tutorService: TutorDashboardService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTutorData();
  }

  loadTutorData(): void {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      Swal.fire({
        icon: 'error',
        title: 'Sesión no encontrada',
        text: 'Por favor, inicia sesión nuevamente.',
        confirmButtonColor: '#007bff',
      }).then(() => this.router.navigate(['/login']));
      return;
    }

    const tutor = JSON.parse(usuario);
    const start = performance.now();

    this.tutorService.getTutorById(tutor.id).subscribe({
      next: (data) => {
        const elapsed = performance.now() - start;
        const delay = Math.max(0, 1200 - elapsed);

        setTimeout(() => {
          this.tutor = data;
          this.loading = false;

          // Si faltan datos clave, se abre el formulario automáticamente
          if (!this.tutor.numeroContacto || !this.tutor.carrera) {
            this.modoCompletar = true;
            this.mostrarFormulario = true;
            Swal.fire({
              icon: 'info',
              title: 'Completa tu perfil',
              text: 'Agrega tu número de contacto y carrera.',
              confirmButtonColor: '#007bff',
            });
          }
        }, delay);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el perfil.', 'error');
        this.loading = false;
      },
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cancelarEdicion(): void {
    this.mostrarFormulario = false;
    this.modoCompletar = false;
  }

  /** 📸 Subir foto y mostrar vista previa */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.tutor.foto = reader.result as string; // Guardar directamente en base64
    };
    reader.readAsDataURL(file);
  }

  guardarCambios(form: NgForm): void {
    if (form.invalid) {
      Swal.fire('Campos incompletos', 'Por favor llena todos los campos requeridos.', 'warning');
      return;
    }

    const updatedTutor = {
      numeroContacto: this.tutor.numeroContacto,
      carrera: this.tutor.carrera,
      foto: this.tutor.foto,
    };

    this.tutorService.updateTutorProfile(this.tutor.id, updatedTutor).subscribe({
      next: (data: any) => {
        Swal.fire({
          icon: 'success',
          title: this.modoCompletar ? 'Perfil completado 🎉' : 'Cambios guardados',
          showConfirmButton: false,
          timer: 1500,
        });
        this.mostrarFormulario = false;
        this.modoCompletar = false;
      },
      error: (err: any) => {
        console.error('❌ Error al actualizar tutor:', err);
        Swal.fire('Error', 'No se pudo guardar la información.', 'error');
      },
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.tutor.numero_contacto = '';
    this.tutor.carrera = '';
    console.log('🧹 Formulario reiniciado.');
  }
}
