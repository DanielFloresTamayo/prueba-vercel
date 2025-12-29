import { Component,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormBuilder } from '@angular/forms';
import { Participante } from '../models/participante.model';
import { RegistroParticipanteService } from './registro-participante.service';
import * as bcrypt from 'bcryptjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-registro-participante',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, FormsModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './registro-participante.component.html',
  styleUrls: ['./registro-participante.component.css']
})
export class RegistroParticipanteComponent {
  correoPersonal: string = '';
  nombres: string = '';
  apellidos: string = '';
  contrasena: string = '';
  showPassword = false;
  correoDuplicado = false;
  formSubmitted = false;
  isLoading = false;

  constructor(
    private registroService: RegistroParticipanteService,
    private cd: ChangeDetectorRef
  ) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  onRegister(form: any): void {
    this.formSubmitted = true;
    this.correoDuplicado = false;


    if (form.valid) {
      this.isLoading = true;
      this.cd.detectChanges();
      

      // Primero verificamos si existe el correo
      this.registroService.obtenerParticipantes().subscribe({

        next: (participantes) => {
          const existe = participantes.some(
            (p) => p.correoPersonal === this.correoPersonal);

          if (existe) {
            this.isLoading = false;
            this.correoDuplicado = true;
            alert('⚠️ El correo ya está registrado, intente uno nuevo.');
            return;
          }
          // 🔐 Generar el hash de la contraseña antes de enviar
          const salt = bcrypt.genSaltSync(10); // Genera la “sal” (aleatoriedad)
          const hashedPassword = bcrypt.hashSync(this.contrasena, salt);

          const nuevoParticipante: Participante = {
            nombres: this.nombres,
            apellidos: this.apellidos,
            correoPersonal: this.correoPersonal,
            contrasena: hashedPassword,
          };

          // Registramos al participante
          this.registroService.registrarParticipante(nuevoParticipante).subscribe({
            next: (response) => {
              this.isLoading = false;
              
              alert('Registro completado con éxito.');
              this.resetForm(form);
            },
            error: (error) => {
              
              this.isLoading = false;
              alert('Ocurrió un error al registrar el participante.');
            }
          });
        },

        error: (error) => {
          
          this.isLoading = false;
          alert('❌ Error al verificar correos existentes.');
        }

      });
    }
  }

  resetForm(form: any): void {
    this.correoPersonal = '';
    this.nombres = '';
    this.apellidos = '';
    this.contrasena = '';
    this.formSubmitted = false;
    form.resetForm();
  }
}



