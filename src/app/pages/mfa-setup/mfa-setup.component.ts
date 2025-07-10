// src/app/pages/mfa-setup/mfa-setup.component.ts
import { Component } from '@angular/core';
import { MFAService } from '../../services/mfa.service';

@Component({
  selector: 'app-mfa-setup',
  templateUrl: './mfa-setup.component.html',
  styleUrls: ['./mfa-setup.component.css'],
})
export class MFASetupComponent {
  qrCodeDataUrl: string | null = null;
  secret: string | null = null;
  error: string | null = null;
  loading = false;
qrDataUrl: any;

  constructor(private mfaService: MFAService) {}

  ngOnInit() {
    this.loading = true;
    this.mfaService.setupMFA().subscribe({
      next: (res) => {
        // El backend te da la URL OTP, que puedes mostrar como código QR con una librería
        // Pero lo más simple es usar un generador QR en frontend con la URL otp_url

        this.secret = res.secret;

        // Generar QR en base64 usando una librería QR en Angular (ejemplo más adelante)
        this.generateQRCode(res.otp_url);

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al obtener QR MFA';
        this.loading = false;
      }
    });
  }

generateQRCode(data: string) {
  import('qrcode').then(qrcode => {
    qrcode.toDataURL(data).then((url: string) => {
      this.qrCodeDataUrl = url;
    }).catch((err: any) => {
      console.error('Error generando QR:', err);
    });
  }).catch(err => {
    console.error('Error importando qrcode:', err);
  });
}

}
