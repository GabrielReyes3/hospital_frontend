import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

import { AuthService, RegisterData, MFASetupResponse } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    CardModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  tiposUsuarios = [
    { label: 'Paciente', value: 'paciente' },
    { label: 'Enfermera', value: 'enfermera' },
  ];

  generos = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Femenino', value: 'femenino' },
    { label: 'Otro', value: 'otro' },
  ];

  nombre = '';
  apellidos = '';
  tipo: string | null = null;
  fecha_nacimiento: Date | null = null;
  genero: string | null = null;
  correo = '';
  contrasena = '';
  confirmarContrasena = '';

  errorMsg = '';

  // Para mostrar QR MFA
  mfaQRBase64: string | null = null;
  mfaSecret: string | null = null;
  showMfaSetup = false;

constructor(public router: Router, private authService: AuthService) {}

  onSubmit(form: NgForm) {

    if (this.contrasena.length < 12 || 
    !/\d/.test(this.contrasena) || 
    !/[!@#~$%^&*()_+={}\[\]:;"'<>,.?\/\\|.-]/.test(this.contrasena)) {
  this.errorMsg = 'La contraseña debe tener al menos 12 caracteres, incluir un número y un símbolo.';
  return;
}

    this.errorMsg = '';

    if (!form.valid) {
      this.errorMsg = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.tipo) {
      this.errorMsg = 'Selecciona un tipo de usuario.';
      return;
    }

    let fechaStr: string | undefined = undefined;
    if (this.fecha_nacimiento) {
      fechaStr = this.fecha_nacimiento.toISOString().slice(0, 10);
    }

    const data: RegisterData = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      tipo: this.tipo,
      fecha_nacimiento: fechaStr,
      genero: this.genero ?? undefined,
      correo: this.correo,
      contrasena: this.contrasena,
    };

    this.authService.register(data).subscribe({
      next: () => {
        // Registro OK, activar MFA:
        this.authService.activarMFA(this.correo).subscribe({
          next: (res: MFASetupResponse) => {
            this.mfaSecret = res.secret;
            this.mfaQRBase64 = res.qr_base64;
            this.showMfaSetup = true;
          },
          error: () => {
            this.errorMsg = 'Error al activar MFA después del registro.';
          },
        });
      },
      error: (err) => {
        this.errorMsg =
          err.error?.message || 'Ocurrió un error en el registro. Intenta de nuevo.';
      },
    });
  }
}
