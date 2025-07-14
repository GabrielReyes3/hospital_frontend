import { Component } from '@angular/core';
import { PacienteRoutingModule } from "../../paciente/paciente-routing.module";
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [PacienteRoutingModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
