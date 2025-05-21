import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-payment-qr-code',
  imports: [QRCodeComponent],
  templateUrl: './payment-qr-code.component.html',
  styleUrl: './payment-qr-code.component.scss'
})
export class PaymentQrCodeComponent {
  qrCodeUrl: string = 'https://nubank.com.br/cobrar/osuvr/6829e136-0237-4f33-8a07-64e3742ba4a1';
}
