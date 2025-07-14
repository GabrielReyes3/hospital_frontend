import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

import { ToastrService } from 'ngx-toastr';  // Importa ToastrService
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

  constructor(
    private consultaService: ConsultaService,
    private toastr: ToastrService  // Inyecta ToastrService
  ) {}

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
      this.toastr.error('ID de paciente inválido', 'Error');
      return;
    }
    if (!this.form.id_medico || this.form.id_medico <= 0) {
      this.toastr.error('ID de médico inválido', 'Error');
      return;
    }
    if (!this.form.horario) {
      this.toastr.error('Horario es requerido', 'Error');
      return;
    }

    const dateObj = new Date(this.form.horario);
    if (isNaN(dateObj.getTime())) {
      this.toastr.error('Horario inválido', 'Error');
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
      next: () => this.toastr.success('Cita creada exitosamente', '¡Éxito!'),
      error: (err) => this.toastr.error(err.error?.error || 'Error inesperado', '❌ Error'),
    });
  }
}
