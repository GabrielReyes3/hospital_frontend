import { Component } from '@angular/core';
import { PacienteRoutingModule } from "../../paciente/paciente-routing.module";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

// dashboard.component.ts
@Component({
  standalone: true,
  selector: 'app-dashboard-enfermera',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule],
})
export class DashboardComponent {
    constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
