import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormBuilder } from '@angular/forms';

import { RegistroParticipanteService } from './registro-participante.service';

@Component({
  selector: 'app-registro-participante',
  imports: [MatButtonModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './registro-participante.component.html',
  styleUrls: ['./registro-participante.component.css']
})
export class RegistroParticipanteComponent {
  correo: string = '';
  nombres: string = '';
  apellidos: string = '';
  contrasena: string = '';
  formSubmitted: boolean = false;
  showPassword = false;
  correoDuplicado: boolean = false;

  constructor(
    private registroService: RegistroParticipanteService,
    private fb: FormBuilder) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Método que se ejecuta al intentar registrar
  onRegister(registroForm: any) {
    this.formSubmitted = true;
    this.correoDuplicado = false; // Reiniciamos el estado del error


    if (registroForm.valid, this.correo && this.nombres && this.apellidos && this.contrasena) {
      const nuevoParticipante = {
        correo: this.correo,
        nombre: this.nombres,
        apellido: this.apellidos,
        password: this.contrasena,
        rol: 'Participante', // Por defecto, asignamos el rol 'Participante'
      };

      this.registroService.registrarParticipante(nuevoParticipante).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          alert('Registro completado');
          // Limpiar el formulario después del registro
          this.resetForm(registroForm);
        },
        error: (error) => {
          console.error('Error en el registro:', error);

          const mensajeError = error.error.message || 'Ocurrió un error inesperado.';
          alert(mensajeError); // Muestra el mensaje enviado por el backend

          if (error.error.message === 'Correo repetido.') {
            this.correoDuplicado = true;
          } 
        },
      });
    }
  }
  resetForm(registroForm: any) {
    this.correo = '';
    this.nombres = '';
    this.apellidos = '';
    this.contrasena = '';
    this.formSubmitted = false;

    registroForm.resetForm();
  }
}


