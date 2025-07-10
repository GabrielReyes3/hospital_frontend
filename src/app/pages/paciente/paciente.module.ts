// src/app/pages/paciente/paciente.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { pacienteRoutes } from './paciente.routes';

@NgModule({
  imports: [RouterModule.forChild(pacienteRoutes)]
})
export class PacienteModule {}
