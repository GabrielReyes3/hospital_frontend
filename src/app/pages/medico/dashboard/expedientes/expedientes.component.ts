import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../../../services/medico.service';

@Component({
  selector: 'app-expedientes',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ FormsModule para ngModel
  templateUrl: './expedientes.component.html',
  styleUrl: './expedientes.component.css',
})
export class ExpedientesComponent {
  pacienteId: number | null = null;
  expediente: any = null;

  constructor(private medicoService: MedicoService) {}

  buscar() {
    if (!this.pacienteId) return;
    this.medicoService.obtenerExpediente(this.pacienteId).subscribe({
      next: (data) => (this.expediente = data),
      error: () => (this.expediente = null),
    });
  }
}
