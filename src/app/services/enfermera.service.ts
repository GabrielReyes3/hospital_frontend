import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  id: number;
  consultorio: string;
  medico: string;
  paciente: string;
  tipo: string;
  horario: string;
  diagnostico: string | null;
}

export interface Expediente {
ultima_actualizacion: any;
  id: number;
  paciente_id: number;
  paciente_nombre: string;
  grupo_sanguineo: string;
  alergias: string | null;
  enfermedades_cronicas: string | null;
  antecedentes_familiares: string | null;
  antecedentes_personales: string | null;
  medicamentos_habituales: string | null;
  vacunas: string | null;
  notas_generales: string | null;
  fecha_actualizacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnfermeraService {
  private apiUrl = 'http://localhost:3000/api/enfermera'; // Ajusta según tu URL

  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas`);
  }

  getExpedientes(): Observable<Expediente[]> {
    return this.http.get<Expediente[]>(`${this.apiUrl}/expedientes`);
  }
}
