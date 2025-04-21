import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TutorProfileService } from '../services/tutor-profile.service';

// Definición de la interfaz sin índice
export interface TutorProfile {
  nombre: string;
  apellido: string;
  email: string;
  fecha_nacimiento: string;
  numero_contacto: string;
  carrera: string;
  foto: string;
}

@Component({
  selector: 'app-tutor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css'],
})
export class TutorProfileComponent implements OnInit {
  tutor: TutorProfile = {
    nombre: '',
    apellido: '',
    email: '',
    fecha_nacimiento: '',
    numero_contacto: '',
    carrera: '',
    foto: '/assets/default-profile.png',
  };

  private tutorService = inject(TutorProfileService);

  constructor() {
    console.log('TutorProfileComponent inicializado.');
  }

  ngOnInit(): void {
    this.loadTutorData();
  }

  loadTutorData(): void {
    this.tutorService.getTutorProfile().subscribe({
      next: (response) => {
        console.log('📥 Datos recibidos del perfil:', response);
        if (response.success && response.data) {
          // Mapear la respuesta del backend a la interfaz TutorProfile
          this.tutor = {
            nombre: response.data.nombre || '',
            apellido: response.data.apellido || '',
            email: response.data.correo || '',
            fecha_nacimiento: response.data.fecha_nacimiento || '',
            numero_contacto: response.data.numero_contacto || '',
            carrera: response.data.carrera || '',
            foto: response.data.foto && response.data.foto.trim() ? response.data.foto : '/assets/default-profile.png',
          };
          console.log('📝 Perfil actualizado en frontend:', this.tutor);
        }
      },
      error: (err) => {
        console.error('❌ Error al cargar el perfil del tutor:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el perfil. Intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  saveChanges(): void {
    // Solo enviamos los campos a actualizar: número de contacto y carrera
    const updateData = {
      numero_contacto: this.tutor.numero_contacto,
      carrera: this.tutor.carrera,
    };

    console.log('📤 Enviando datos actualizados:', updateData);
    this.tutorService.updateTutorProfile(updateData).subscribe({
      next: (response) => {
        console.log('✅ Respuesta de actualización:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Actualización exitosa!',
          text: 'Los datos se han guardado correctamente.',
          confirmButtonText: 'Aceptar'
        });
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Error al actualizar el perfil:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron actualizar los datos. Intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('📂 Archivo seleccionado:', file);
      this.tutorService.uploadProfilePicture(file).subscribe({
        next: (response) => {
          console.log('🖼️ Imagen subida, respuesta:', response);
          if (response.success && response.imageUrl) {
            this.tutor.foto = response.imageUrl;
            Swal.fire({
              icon: 'success',
              title: 'Foto subida',
              text: 'La imagen se ha subido y guardado correctamente.',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error: (err) => {
          console.error('❌ Error al subir la imagen:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo subir la imagen. Intenta nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }

  // Función para limpiar los campos de contacto en el formulario
  resetForm(): void {
    this.tutor.numero_contacto = '';
    this.tutor.carrera = '';
    console.log('🧹 Formulario reiniciado.');
  }
}
