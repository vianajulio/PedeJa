import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { AddressModalComponent } from '../shared-components/address-modal/address-modal.component';
import { AddressComponent } from '../shared-components/address/address.component';
import { OrderComponent } from '../home/components/order/order.component';
import { PaymentQrCodeComponent } from './components/payment-qr-code/payment-qr-code.component';
import { ConfirmOrdersComponent } from '../shared-components/confirm-orders/confirm-orders.component';
import { Route, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

declare var bootstrap: any;
@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    AddressModalComponent,
    AddressComponent,
    OrderComponent,
    PaymentQrCodeComponent,
    ConfirmOrdersComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  toastMessage: string = '';
  deliveryTax: number = 15;

  hasAddress: boolean = false;
  hasOrderItems: boolean = false;

  checkOrder: boolean;
  paymentOrder: boolean;

  constructor(
    private localStorage: LocalStorageService,
    private route: Router,
    private orderService: OrderService
  ) {
    this.hasOrderItems = localStorage.getOrder().order.length != 0;
    this.hasAddress = localStorage.getAddress().length != 0;

    this.checkOrder = false;
    this.paymentOrder = false;
  }

  finishOrder() {
    this.hasAddress = this.localStorage.getAddress().length != 0;
    if (!this.hasAddress) {
      this.showToast('Preencher endereço.');
      return;
    }

    if (!this.hasOrderItems) {
      this.showToast('Selecionar pedidos.');
      return;
    }

    this.showToast('A cozinha ira verificar o pedido!');
    this.checkOrder = true;
  }

  showToast(message: string) {
    this.toastMessage = message;
    const toastEl = document.getElementById('finish-payment-toast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    return;
  }

  reset() {
    this.localStorage.resetOrderLocalStorage();
    
    this.localStorage.setToastMessage('Pedido a caminho!');
    this.route.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }
}
