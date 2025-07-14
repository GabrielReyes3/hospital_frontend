import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // <--- Importa esto
import { EnfermeraService, Cita } from '../../../../services/enfermera.service';

@Component({
  selector: 'app-citas',
    imports: [CommonModule],  // <--- Incluye CommonModule aquí

  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citas: Cita[] = [];
  loading = false;
  error = '';

  constructor(private enfermeraService: EnfermeraService) {}

  ngOnInit() {
    this.loading = true;
    this.enfermeraService.getCitas().subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las citas';
        this.loading = false;
      }
    });
  }
}
