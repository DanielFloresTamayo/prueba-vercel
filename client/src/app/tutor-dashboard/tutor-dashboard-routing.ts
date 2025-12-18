import { Routes } from '@angular/router';
import { TutorDashboardComponent } from './tutor-dashboard.component';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
import { TutorChangePasswordComponent } from './tutor-change-password/tutor-change-password.component';
import { ClasesComponent } from './tutor-classes/clases.component';
import { TutorCitasComponent } from './tutor-citas/tutor-citas.component';
import { TutorResenasComponent } from './tutor-resenas/tutor-resenas.component';

export const TUTOR_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: TutorDashboardComponent, // 🔹 El layout con el sidebar
    children: [
      { path: 'perfil', component: TutorProfileComponent },
      { path: 'cambiar-contrasena', component: TutorChangePasswordComponent },
      { path: 'clases', component: ClasesComponent },
      { path: 'citas', component: TutorCitasComponent },
      { path: 'resenas', component: TutorResenasComponent },
      { path: '', redirectTo: 'perfil', pathMatch: 'full' }
    ]
  }
];
