import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- Importa CommonModule aquí
import { PacienteService, ConsultaHistorial } from '../../../../services/paciente.service';

@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.component.html',
  styleUrls: ['./historial-citas.component.css'],
  standalone: true,
  imports: [CommonModule],  // <-- agrégalo aquí
})
export class HistorialCitasComponent implements OnInit {
  historial: ConsultaHistorial[] = [];
  loading = false;
  errorMessage = '';

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.loading = true;
    this.pacienteService.getHistorial().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.historial = res.historial;
        } else {
          this.errorMessage = 'Error al obtener el historial';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error en la conexión con el servidor';
        this.loading = false;
      },
    });
  }
}
