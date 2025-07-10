import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginRequest {
  email: string;
  password: string;
  totp?: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  usuario: {
    id: number;
    correo: string;
    tipo: string;
  };
}

export interface RegisterData {
  nombre: string;
  apellidos: string;
  tipo: string;
  fecha_nacimiento?: string;
  genero?: string;
  correo: string;
  contrasena: string;
}

export interface MFASetupResponse {
  otp_url: string;
  secret: string;
  qr_base64: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('tipo', res.usuario.tipo); // Guardamos el tipo
      })
    );
  }

  getTipoUsuario(): string {
    return localStorage.getItem('tipo') || '';
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('tipo');
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  refreshAccessToken(): Observable<any> {
    const refresh_token = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.baseUrl}/refresh`, { refresh_token });
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  activarMFA(correo: string): Observable<MFASetupResponse> {
    return this.http.post<MFASetupResponse>(`${this.baseUrl}/activar-mfa?correo=${correo}`, {});
  }
}
