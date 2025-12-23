import { Routes } from '@angular/router';
import { RegistroParticipanteComponent } from './registro-participante/registro-participante.component';
import { RegistroTutorComponent } from './registro-tutor/registro-tutor.component';
import { TUTOR_DASHBOARD_ROUTES } from './tutor-dashboard/tutor-dashboard-routing';
import { AuthGuard } from './guards/auth.guard';
import { PARTICIPANTE_DASHBOARD_ROUTES } from './participante-dashboard/participante-dashboard-routing';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [


  { path: 'registro-participante', component: RegistroParticipanteComponent },
  { path: 'registro-tutor', component: RegistroTutorComponent },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: '',component: HomeComponent},

  {
    path: 'tutor',
    canActivate: [AuthGuard],
    children: TUTOR_DASHBOARD_ROUTES
  },

  {
    path: 'participante',
    canActivate: [AuthGuard],
    children: PARTICIPANTE_DASHBOARD_ROUTES
  },

    // Si ingresan ruta inválida
  { path: '**', redirectTo: 'login' }

];

