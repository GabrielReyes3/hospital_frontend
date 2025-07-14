import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoRoutingModule } from './medico-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

// Importar los componentes standalone
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitasComponent } from './dashboard/citas/citas.component';
import { ExpedientesComponent } from './dashboard/expedientes/expedientes.component';
import { RecetasComponent } from './dashboard/recetas/recetas.component';

@NgModule({
  imports: [
    CommonModule,
    MedicoRoutingModule,
    RouterModule,
    FormsModule,
    CardModule,
    
    // IMPORTA los componentes standalone
    DashboardComponent,
    CitasComponent,
    ExpedientesComponent,
    RecetasComponent
  ]
})
export class MedicoModule {}
