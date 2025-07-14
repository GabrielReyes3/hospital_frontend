import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../../../services/medico.service';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css',
})
export class RecetasComponent {
  consulta_id = 0;
  medicamento = '';
  dosis = '';
  nota = '';
  resultado = '';
  paciente = '';
consultas: any;

  constructor(private medicoService: MedicoService) {}

  crear() {
    this.medicoService
      .crearReceta({
        consulta_id: this.consulta_id,
        medicamento: this.medicamento,
        dosis: this.dosis,
        nota: this.nota,
      })
      .subscribe({
        next: (res: any) => {
          this.resultado = res.status;
          this.paciente = res.paciente;
        },
        error: () => {
          this.resultado = 'Error al crear receta';
          this.paciente = '';
        },
      });
  }
}
