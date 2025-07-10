import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

import { ConsultaService, CrearConsultaData, Consultorio } from '../../../../services/consulta.service';

@Component({
  selector: 'app-solicitar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitar-cita.component.html',
  styleUrls: ['./solicitar-cita.component.css']
})
export class SolicitarCitaComponent implements OnInit {
  consultorios: Consultorio[] = [];

  form: CrearConsultaData = {
    id_paciente: 0,
    id_medico: 41,  // Cambia por id válido
    id_consultorio: 0,
    tipo: '',
    horario: ''
  };

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.consultaService.obtenerConsultorios().subscribe((res) => {
      this.consultorios = res.data;
    });

    const token = localStorage.getItem('access_token');
    if (token) {
      const payload: any = jwtDecode(token);
      this.form.id_paciente = Number(payload.usuario_id || payload.user_id);
    }
  }

  solicitarCita() {
    if (!this.form.id_paciente || this.form.id_paciente <= 0) {
      alert('ID de paciente inválido');
      return;
    }
    if (!this.form.id_medico || this.form.id_medico <= 0) {
      alert('ID de médico inválido');
      return;
    }
    if (!this.form.horario) {
      alert('Horario es requerido');
      return;
    }

    const dateObj = new Date(this.form.horario);
    if (isNaN(dateObj.getTime())) {
      alert('Horario inválido');
      return;
    }
    const horarioISO = dateObj.toISOString();

    const data: CrearConsultaData = {
      ...this.form,
      id_consultorio: Number(this.form.id_consultorio),
      horario: horarioISO,
      id_paciente: this.form.id_paciente,
      id_medico: this.form.id_medico,
    };

    this.consultaService.crearConsulta(data).subscribe({
      next: () => alert('✅ Cita creada exitosamente'),
      error: (err) => alert('❌ Error: ' + (err.error?.error || 'Error inesperado')),
    });
  }
}
