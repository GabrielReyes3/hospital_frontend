import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HistorialCitasComponent } from './dashboard/historial-citas/historial-citas.component';
import { RecetasComponent } from './dashboard/recetas/recetas.component';
import { SolicitarCitaComponent } from './dashboard/solicitar-cita/solicitar-cita.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'historial-citas', component: HistorialCitasComponent },
      { path: 'recetas', component: RecetasComponent },
      { path: 'solicitar-cita', component: SolicitarCitaComponent },
      { path: '', redirectTo: 'historial-citas', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteRoutingModule {}
