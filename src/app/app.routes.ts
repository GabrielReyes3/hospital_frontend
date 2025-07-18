import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas para dashboards por tipo de usuario con carga lazy y guard
  {
    path: 'paciente',
    canActivate: [roleGuard],
    data: { allowed: ['paciente'] },
    loadChildren: () =>
      import('./pages/paciente/paciente.module').then((m) => m.PacienteModule),
  },

  {
  path: 'enfermera',
  canActivate: [roleGuard],
  data: { allowed: ['enfermera'] },
  loadChildren: () =>
    import('./pages/enfermera/enfermera.module').then(m => m.EnfermeraModule),
},

{
  path: 'medico',
  canActivate: [roleGuard],
  data: { allowed: ['medico'] },
  loadChildren: () =>
    import('./pages/medico/medico.module').then((m) => m.MedicoModule),
},

  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // redirige a /login por defecto
  // { path: '**', redirectTo: 'login' } // cualquier ruta desconocida va a login
];
