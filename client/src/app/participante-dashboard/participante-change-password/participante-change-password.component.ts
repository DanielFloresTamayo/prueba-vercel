import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';
import { ParticipanteDashboardService } from '../services/participante-dashboard.services';


@Component({
  selector: 'app-participante-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './participante-change-password.component.html',
  styleUrls: ['./participante-change-password.component.css']
})
export class ParticipanteChangePasswordComponent implements OnInit {
  formPassword!: FormGroup;
  participante: any = null;
  userId!: number;
  showRequirements = false;

  // 👁️ control de visibilidad de contraseñas
  showCurrent = false;
  showNew = false;
  showConfirm = false;

  constructor(
    private fb: FormBuilder,
    private participanteService: ParticipanteDashboardService
  ) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const parsed = JSON.parse(usuario);
      this.userId = parsed.id;
    }

    if (this.userId) {
      this.participanteService.getParticipanteById(this.userId).subscribe({
        next: (res) => (this.participante = res),
        error: () => {
          Swal.fire('Error', 'No se pudo cargar la información del participante.', 'error');
        }
      });
    }

    this.formPassword = this.fb.group({
      actual: ['', Validators.required],
      nueva: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,12}$/)
        ]
      ],
      confirmar: ['', Validators.required]
    });
  }

  onNewPasswordInput(): void {
    this.showRequirements = this.formPassword.get('nueva')?.value.length > 0;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.formPassword.get('nueva')?.value || '');
  }
  hasNumber(): boolean {
    return /\d/.test(this.formPassword.get('nueva')?.value || '');
  }
  hasSpecialChar(): boolean {
    return /[!@#$%^&*]/.test(this.formPassword.get('nueva')?.value || '');
  }

  toggleVisibility(field: string): void {
    if (field === 'actual') this.showCurrent = !this.showCurrent;
    else if (field === 'nueva') this.showNew = !this.showNew;
    else if (field === 'confirmar') this.showConfirm = !this.showConfirm;
  }

  onSubmit(): void {
    if (this.formPassword.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos correctamente.'
      });
      return;
    }

    const { actual, nueva, confirmar } = this.formPassword.value;

    if (nueva !== confirmar) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseñas no coinciden',
        text: 'La nueva contraseña y su confirmación deben ser iguales.'
      });
      return;
    }

    if (!this.participante?.contrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la contraseña actual.'
      });
      return;
    }

    const passwordCorrecta = bcrypt.compareSync(actual, this.participante.contrasena);
    if (!passwordCorrecta) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña incorrecta',
        text: 'La contraseña actual no coincide.'
      });
      return;
    }

    const hashedPassword = bcrypt.hashSync(nueva, 10);
    this.participanteService.updateParticipantePassword(this.userId, hashedPassword).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          html: `<p style="font-size: 16px; color: #555;">
                  Tu nueva contraseña se ha guardado correctamente.<br><br>
                  <b>${nueva}</b>
                </p>`
        }).then(() => this.resetForm());
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar la contraseña.', 'error')
    });
  }

  resetForm(): void {
    this.formPassword.reset();
    this.showRequirements = false;
  }
}
