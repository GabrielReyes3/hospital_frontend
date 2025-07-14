import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermeraService, Expediente } from '../../../../services/enfermera.service';

@Component({
  selector: 'app-expedientes',
      imports: [CommonModule],  // <--- Incluye CommonModule aquí

  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {
  expedientes: Expediente[] = [];
  loading = false;
  error = '';

  constructor(private enfermeraService: EnfermeraService) {}

  ngOnInit() {
    this.loading = true;
    this.enfermeraService.getExpedientes().subscribe({
      next: (data) => {
        this.expedientes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los expedientes';
        this.loading = false;
      }
    });
  }
}
