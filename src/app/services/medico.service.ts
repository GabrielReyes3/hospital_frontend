import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000/api/medico';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  constructor(private http: HttpClient) {}

  obtenerCitas(): Observable<any> {
    return this.http.get(`${API}/citas`);
  }

  obtenerExpediente(pacienteId: number): Observable<any> {
    return this.http.get(`${API}/expedientes/${pacienteId}`);
  }

  crearReceta(data: {
    consulta_id: number;
    medicamento: string;
    dosis: string;
    nota: string;
  }): Observable<any> {
    return this.http.post(`${API}/recetas`, data);
  }
}
