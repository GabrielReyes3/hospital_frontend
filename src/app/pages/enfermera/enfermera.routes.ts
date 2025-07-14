// src/app/pages/enfermera/enfermera.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitasComponent } from '../enfermera/dashboard/citas/citas.component';
import { ExpedientesComponent } from '../enfermera/dashboard/expedientes/expedientes.component';

export const enfermeraRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'citas', component: CitasComponent },
      { path: 'expedientes', component: ExpedientesComponent },
      { path: '', redirectTo: 'citas', pathMatch: 'full' }
    ]
  }
];
