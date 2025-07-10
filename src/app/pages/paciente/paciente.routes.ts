// src/app/pages/paciente/paciente.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SolicitarCitaComponent } from './dashboard/solicitar-cita/solicitar-cita.component';
import { RecetasComponent } from './dashboard/recetas/recetas.component';
import { HistorialCitasComponent } from './dashboard/historial-citas/historial-citas.component';

export const pacienteRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'solicitar-cita', component: SolicitarCitaComponent },
      { path: 'recetas', component: RecetasComponent },
      { path: 'historial-citas', component: HistorialCitasComponent },
      { path: '', redirectTo: 'solicitar-cita', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // importante
];
