import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CitasComponent } from './dashboard/citas/citas.component';
import { ExpedientesComponent } from './dashboard/expedientes/expedientes.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'citas', component: CitasComponent },
      { path: 'expedientes', component: ExpedientesComponent },
      { path: '', redirectTo: 'citas', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnfermeraRoutingModule {}
