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
    { label: 'Médico', value: 'medico' },
    { label: 'Paciente', value: 'paciente' },
    { label: 'Admin', value: 'admin' },
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

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
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

    // Aquí iría la lógica real para enviar los datos al backend (API)

    console.log('Registro OK:', {
      nombre: this.nombre,
      apellidos: this.apellidos,
      tipo: this.tipo,
      fecha_nacimiento: this.fecha_nacimiento,
      genero: this.genero,
      correo: this.correo,
      contrasena: this.contrasena,
    });

    // Redireccionar a login después de registro exitoso (por ejemplo)
    this.router.navigate(['/login']);
  }
}
