import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitasComponent } from '../medico/dashboard/citas/citas.component';
import { ExpedientesComponent } from '../medico/dashboard/expedientes/expedientes.component';
import { RecetasComponent } from '../medico/dashboard/recetas/recetas.component';

export const medicoRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'citas', component: CitasComponent },
      { path: 'expedientes', component: ExpedientesComponent },
      { path: 'recetas', component: RecetasComponent },
      { path: '', redirectTo: 'citas', pathMatch: 'full' }
    ]
  }
];
