import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar-asignatura/registrar.component';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';
import { RegistroParticipanteComponent } from './registro-participante/registro-participante.component';
import { RegistroTutorComponent } from './registro-tutor/registro-tutor.component';
import { TUTOR_DASHBOARD_ROUTES } from './tutor-dashboard/tutor-dashboard-routing';
import { TutorProfileComponent } from './tutor-dashboard/tutor-profile/tutor-profile.component';

const appRoutes = [
{ path: 'tutor', children: TUTOR_DASHBOARD_ROUTES }, // Carga las rutas del dashboard del tutor
{ path: '', redirectTo: 'tutor/perfil', pathMatch: 'full' }, // Redirección por defecto

  //  {path: "app-login", component: LoginComponent, pathMatch: "full"},
  //   {path: "app-registrar", component: RegistrarComponent, pathMatch: "full"},
];

export const routes: Routes = [
  // path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "registrar", component: RegistrarComponent, pathMatch: "full" },
  { path: "gestion-usuario", component: GestionUsuarioComponent, pathMatch: "full" },
  { path: "registro-participante", component: RegistroParticipanteComponent, pathMatch: "full" },
  { path: "registro-tutor", component: RegistroTutorComponent, pathMatch: "full" },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'tutor/perfil', loadComponent: () => import('./tutor-dashboard//tutor-profile/tutor-profile.component').then(m => m.TutorProfileComponent) }, 
];

