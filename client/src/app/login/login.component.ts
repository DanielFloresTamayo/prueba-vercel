import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import * as bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  cargando = false;
  errorMessage = '';
  isPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    // Inicializamos el formulario
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /** Alterna la visibilidad del campo contraseña */
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /** Enviar formulario de login */
  login(): void {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de continuar.',
        confirmButtonColor: '#007bff'
      });
      return;
    }

    const correo = this.loginForm.value.correo;
    const password = this.loginForm.value.password;
    this.cargando = true;
    this.cd.detectChanges();

    // 🔹 Muestra spinner con SweetAlert2
    Swal.fire({
      title: 'Verificando credenciales...',
      html: 'Por favor espera unos segundos.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // 1️⃣ Buscar en tutores
    this.loginService.getTutorByCorreo(correo).subscribe(tutores => {
      if (tutores.length > 0) {
        const tutor = tutores[0];
        const match = bcrypt.compareSync(password, tutor.contrasena);
        if (match) {
          Swal.close();
         // console.log(`✅ Se inició sesión con el tutor: ${tutor.nombres} ${tutor.apellidos}`);

          localStorage.setItem('usuario', JSON.stringify({ id: tutor.id, tipo: 'tutor' }));
          // alert(`¡Bienvenido, ${tutor.nombres}!`);
          this.cargando = false;

          Swal.fire({
            icon: 'success',
            title: `¡Bienvenido, ${tutor.nombres}!`,
            text: 'Inicio de sesión exitoso.',
            showConfirmButton: false,
            timer: 2000,
            background: '#f0fff4'
          });
          this.router.navigate(['tutor/perfil']);

          return;
        }
      }


      // 2️⃣ Buscar en participantes
      this.loginService.getParticipanteByCorreo(correo).subscribe(participantes => {
        if (participantes.length > 0) {
          const participante = participantes[0];
          const match = bcrypt.compareSync(password, participante.contrasena);
          if (match) {
            Swal.close();
           // console.log(`✅ Se inició sesión con el participante: ${participante.nombres} ${participante.apellidos}`);

            localStorage.setItem('usuario', JSON.stringify({ id: participante.id, tipo: 'participante' }));
            localStorage.setItem('userId', String(participante.id));

            this.cargando = false;
            // alert(`¡Bienvenido, ${participante.nombres}!`);

            Swal.fire({
              icon: 'success',
              title: `¡Bienvenido, ${participante.nombres}!`,
              text: 'Inicio de sesión exitoso.',
              showConfirmButton: false,
              timer: 2000,
              background: '#f0fff4'
            });

            this.router.navigate(['/participante']);
            return;
          }
        }

        // ❌ Si llega aquí, no coincidió nada
        this.cargando = false;
        this.errorMessage = 'Correo o contraseña incorrectos';
        //alert(`Correo incorrecto o contraseña incorrecta. Intente de nuevo.`);
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Correo o contraseña incorrectos. Intenta nuevamente.',
          confirmButtonColor: '#d33'
        });

      });
    });

  }

  /** Ir a registro */
  goToRegister() {
    this.router.navigate(['/registro-tutor']);

  }
  goToRegister1() {
    this.router.navigate(['/registro-participante']);

  }
}
