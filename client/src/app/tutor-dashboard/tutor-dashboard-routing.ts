import { Routes } from '@angular/router';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
//import { TutorChangePasswordComponent } from './tutor-change-password/tutor-change-password.component';
//import { TutorClassesComponent } from './tutor-classes/tutor-classes.component';
//import { TutorCommentsComponent } from './tutor-comments/tutor-comments.component';

export const TUTOR_DASHBOARD_ROUTES: Routes = [
  { path: 'perfil', component: TutorProfileComponent,pathMatch: "full" },
 // { path: 'cambiar-contrasena', component: TutorChangePasswordComponent },
  //{ path: 'clases', component: TutorClassesComponent },
  //{ path: 'comentarios', component: TutorCommentsComponent },
];
