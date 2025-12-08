import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { RegistroTutorService } from './registro-tutor.service';
import * as bcrypt from 'bcryptjs';
import { Tutor } from '../models/tutor.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-registro-tutor',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, FormsModule, MatProgressSpinnerModule],
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
  correoDuplicado = false;
  formSubmitted = false;
  isLoading = false;

  constructor(private registroTutorService: RegistroTutorService) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  registerTutor(tutorForm: NgForm): void {

    this.formSubmitted = true;
    this.correoDuplicado = false;

    if (tutorForm.valid) {
      this.isLoading = true;
      // 🔍 Verificamos si el correo ya está registrado
      this.registroTutorService.obtenerTutores().subscribe({
        next: (tutores) => {
          const correoExiste = tutores.some(
            (t) => t.correoInstitucional === this.tutor.correo
          );

          if (correoExiste) {
            this.correoDuplicado = true;
            alert('⚠️ El correo institucional ya está registrado, intente uno nuevo.');
            this.isLoading = false;
            return;
          }
          // console.log('Datos enviados', this.tutor);

          //  Generar el hash de la contraseña antes de enviar
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(this.tutor.password, salt);

          const nuevoTutor: Tutor = {
            nombres: this.tutor.nombre,
            apellidos: this.tutor.apellido,
            correoInstitucional: this.tutor.correo,
            nivelAcademico: this.tutor.nivel_academico,
            fechaNacimiento: this.tutor.fecha_nacimiento,
            contrasena: hashedPassword,
            clases: [],
            resenas: [],
          };

          this.isLoading = true;
          // Registramos al tutor usando el servicio
          this.registroTutorService.registrarTutor(nuevoTutor).subscribe({
            next: (response) => {
              console.log('Tutor registrado exitosamente:', response);
              this.resetForm(tutorForm);
              alert('✅ Registro completado exitosamente.');
              this.isLoading = false;
            },
            error: (error) => {
              console.error('Error al registrar tutor:', error);
              alert('❌ Ocurrió un error al registrar el tutor.');
              this.isLoading = false;
            },
          });
        },
        error: (err) => {
          console.error('Error al verificar correos:', err);
          alert('❌ Error al verificar correos existentes.');
          this.isLoading = false;
          
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