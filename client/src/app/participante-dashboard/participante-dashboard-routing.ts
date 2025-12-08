import { Routes } from '@angular/router';
import { ParticipanteDashboardComponent } from './participante-dashboard.component';

import { ParticipanteChangePasswordComponent } from './participante-change-password/participante-change-password.component';
import { ParticipanteClasesComponent } from './participante-clases/participante-clases.component';
import { ParticipanteCitasComponent } from './participante-citas/participante-citas.component';


export const PARTICIPANTE_DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: ParticipanteDashboardComponent, // Layout con sidebar
        children: [
            
            { path: 'cambiar-contrasena', component: ParticipanteChangePasswordComponent },
            { path: 'clases', component: ParticipanteClasesComponent },
            { path: 'citas', component: ParticipanteCitasComponent },
            { path: '', redirectTo: 'clases', pathMatch: 'full' }
        ]
    }
];
