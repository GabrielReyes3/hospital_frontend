import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterModule,
    ToastModule,  // <-- aquí
  ],
  providers: [MessageService], // <-- aquí también
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  totp = '';
  usarMfa = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService // <-- agrega esto
  ) {}

  login() {
    this.authService
      .login({
        email: this.email,
        password: this.password,
        totp: this.usarMfa ? this.totp : undefined,
      })
      .subscribe({
        next: () => {
          const tipo = this.authService.getTipoUsuario();

          if (tipo === 'paciente') {
            this.router.navigate(['/paciente/dashboard']);
          } else if (tipo === 'enfermera') {
            this.router.navigate(['/enfermera/dashboard']);
          } else if (tipo === 'medico') {
            this.router.navigate(['/medico/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
error: (err) => {
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: err.error?.error || 'Error al iniciar sesión',
  });
}
      });
  }

  onKeyPressNumbersOnly(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

    if (allowedKeys.includes(event.key)) {
      return; // Permite teclas especiales para edición
    }

    const isNumber = /^[0-9]$/.test(event.key);
    if (!isNumber) {
      event.preventDefault();
    }
  }

  onPasteNumbersOnly(event: ClipboardEvent) {
    const paste = event.clipboardData?.getData('text') ?? '';
    if (!/^\d{0,6}$/.test(paste)) {
      event.preventDefault();
    }
  }
}
