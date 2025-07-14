// src/app/services/paciente.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ConsultaHistorial {
  id: number;
  id_consultorio: number;
  id_medico: number;
  id_paciente: number;
  tipo: string;
  horario: string;
  diagnostico: string;
  consultorio_nombre: string;
  consultorio_ubicacion: string;
  consultorio_horario: string;
  medico_nombre: string;
  medico_apellidos: string;
  medico_correo: string;
}

export interface HistorialResponse {
  status: string;
  historial: ConsultaHistorial[];
}

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private baseUrl = 'http://localhost:3000/api/paciente';

  constructor(private http: HttpClient) {}

  getHistorial(): Observable<HistorialResponse> {
    return this.http.get<HistorialResponse>(`${this.baseUrl}/historial`);
  }
}
