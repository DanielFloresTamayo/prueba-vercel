import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { RegistroParticipanteService } from '../registro-participante/registro-participante.service';

@Component({
  selector: 'app-registro-tutor',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './registro-tutor.component.html',
  styleUrl: './registro-tutor.component.css'
})
export class RegistroTutorComponent {
  tutor = {
    correo: '',
    nombre: '',
    apellido: '',
    nivel_academico: '',
    fecha_nacimiento: '',
    password: '',

  };
  showPassword = false;

  constructor(private RegistroParticipanteService: RegistroParticipanteService) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  registerTutor(tutorForm: NgForm): void {
    if (tutorForm.valid) {
      console.log('Datos enviados al servicio:', this.tutor);
      this.RegistroParticipanteService.registrarTutor(this.tutor).subscribe({
        next: (response) => {
          console.log('Tutor registrado exitosamente:', response);
          this.resetForm(tutorForm);
          alert('Registro completado');
        },
        error: (error) => {
          console.error('Error al registrar tutor:', error);
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }


  resetForm(form: NgForm) {
    form.reset();

    // Marca todos los controles como no tocados y prístinos
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsPristine();
      form.controls[key].markAsUntouched();
    });
  }
}