import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  recetas: any[] = [];
  cargando = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('/api/paciente/recetas').subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.recetas = res.recetas;
        } else {
          this.error = 'No se pudieron cargar las recetas.';
        }
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al obtener recetas.';
        this.cargando = false;
      }
    });
  }
}
