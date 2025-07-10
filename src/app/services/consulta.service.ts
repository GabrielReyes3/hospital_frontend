import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Consultorio {
  id: number;
  nombre: string;
  ubicacion: string;
  horario: string;
  tipo: string;
}

export interface CrearConsultaData {
  id_paciente: number;
  id_medico: number;
  id_consultorio: number;
  tipo: string;
  horario: string; // formato ISO 8601
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'http://localhost:3000'; // tu backend

  constructor(private http: HttpClient) {}

  obtenerConsultorios(): Observable<{ status: string; data: Consultorio[] }> {
    return this.http.get<{ status: string; data: Consultorio[] }>(`${this.apiUrl}/consultorios`);
  }

  crearConsulta(data: CrearConsultaData): Observable<any> {
    return this.http.post(`${this.apiUrl}/consultas`, data);
  }
}
