// src/app/services/mfa.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface MFASetupResponse {
  otp_url: string;
  secret: string;
}

@Injectable({
  providedIn: 'root'
})
export class MFAService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  setupMFA() {
    return this.http.post<MFASetupResponse>(`${this.baseUrl}/mfa/setup`, {});
  }
}
