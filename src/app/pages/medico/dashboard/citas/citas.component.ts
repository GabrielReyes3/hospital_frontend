import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MedicoService } from '../../../../services/medico.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, DatePipe], // ✅ se importa DatePipe
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
})
export class CitasComponent implements OnInit {
  citas: any[] = [];

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.medicoService.obtenerCitas().subscribe({
      next: (data) => (this.citas = data),
      error: (err) => console.error('Error al cargar citas', err),
    });
  }
}
