import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

declare var bootstrap: any;

@Component({
  selector: 'app-payment-qr-code',
  imports: [QRCodeComponent],
  templateUrl: './payment-qr-code.component.html',
  styleUrl: './payment-qr-code.component.scss',
})
export class PaymentQrCodeComponent {
  qrCodeUrl: string =
    'https://nubank.com.br/cobrar/osuvr/6829e136-0237-4f33-8a07-64e3742ba4a1';

  paymentKey: string = 'd9ef8353-ce73-47b2-a9f7-8f85e068dfb3';

  toastMessage: string = '';

  copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(this.paymentKey)
        .then(() => {
          this.showToast('Link copiado!');
        })
        .catch((err) => {
          console.error('Erro ao copiar: ', err);
          this.showToast('Erro ao copiar.');
        });
    }
  }

  showToast(message: string) {
    this.toastMessage = message;
    const toastEl = document.getElementById('payment-toast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    return;
  }
}
