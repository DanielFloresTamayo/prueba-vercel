import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible: boolean = false;
  errorMessage: string = '';



  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({  // Inicialización
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/)
      ]]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.errorMessage = ''; // Limpiar errores previos
      const { correo, password } = this.loginForm.value;

      console.log('Formulario válido');
      console.log('Datos enviados:', { correo, password });

      this.authService.login(correo, password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          //this.loginSuccess = true;

          // Obtener el token decodificado a través del AuthService
          const decodedToken = this.authService.getDecodedToken();
          if (decodedToken) {
            //const userRole = decodedToken.rol;
            //console.log('Rol extraído del token:', userRole);

            // Redirección según el rol
            /*            switch (userRole) {
                          case 'Tutor':
                            this.router.navigate(['/registrar']);
                            break;
                          case 'Participante':
                            this.router.navigate(['/registro-participante']);
                            break;
                          case 'Administrador':
                            this.router.navigate(['/registro-tutor']);
                            break;
                          default:
                            console.error('Rol no reconocido:', userRole);
                            this.errorMessage = 'Error en el tipo de usuario';
                        }*/
            // Extraemos el rol y el nombre. Si el token no incluye 'nombre', se usará el correo.

            const userRole = decodedToken.rol;
            const userName = decodedToken.nombre || correo;
            console.log('Rol extraído del token:', userRole);
            // Mostrar popup con SweetAlert2
            Swal.fire({
              icon: 'success',
              title: `Bienvenido ${userName}`,
              text: 'Es grato tenerte de nuevo',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirigir según el rol
                switch (userRole) {
                  case 'Tutor':
                    this.router.navigate(['/tutor/perfil']);
                    break;
                  case 'Participante':
                    this.router.navigate(['/registro-participante']);
                    break;
                  case 'Administrador':
                    this.router.navigate(['/gestion-usuario']);
                    break;
                  default:
                    console.error('Rol no reconocido:', userRole);
                    this.errorMessage = 'Error en el tipo de usuario';
                }
              }
            });
          } else {
            console.error('No se pudo decodificar el token para extraer el rol.');
            this.errorMessage = 'Error al procesar la información del usuario.';
          }

        },
        error: (err) => {
          console.error('Error en login:', err);
          this.errorMessage = err?.error?.mensaje || 'Las credenciales no son las correctas. Por favor, intente nuevamente.';
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }

  // Método para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/registro-participante']);
  }
}