import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/produto.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { OrderItems } from '../../models/orderItem.model';
import { AddressModalComponent } from "../home/components/address-modal/address-modal.component";
import { AddressComponent } from "../home/components/address/address.component";
import { OrderComponent } from "../home/components/order/order.component";
import { PaymentQrCodeComponent } from './components/payment-qr-code/payment-qr-code.component';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, AddressModalComponent, AddressComponent, OrderComponent, PaymentQrCodeComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  @Output() remove = new EventEmitter<number>();
  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();

  public orderMap: OrderItems = {
      orderItems: new Map<number, { product: Product; quantity: number }>()
    };
  public address: string = '';

  constructor(private localStorage: LocalStorageService) {
    this.orderMap = localStorage.getOrder();
    this.address = localStorage.getAddress();
  }

  orderVisible = false;
  deliveryTax: number = 15;

    get orderItemsList() {
    return Array.from(this.orderMap.orderItems.values());
  }
  get total(): number {
    return this.orderItemsList.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  removeItem(id: number) {
    this.remove.emit(id);
  }

  increaseQuantity(id: number) {
    this.increase.emit(id);
  }

  decreaseQuantity(id: number) {
    this.decrease.emit(id);
  }
}
