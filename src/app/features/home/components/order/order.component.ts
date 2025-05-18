import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/produto.model';
import { Router } from '@angular/router';
import { OrdersItemsComponent } from '../orders-items/orders-items.component';
import { OrderItems } from '../../../../models/orderItem.model';

@Component({
  selector: 'app-order',
  imports: [CommonModule, OrdersItemsComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input() orderItems: OrderItems = {
    orderItems: new Map<number, { product: Product; quantity: number }>(),
  };
  @Input() paymentOrder = false;
  
  constructor(private route: Router) {}

  orderVisible = false;

  deliveryTax: number = 15;

  get orderItemsArray() {
    return Array.from(this.orderItems.orderItems.values());
  }

  get total(): number {
    return this.orderItemsArray.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  navigateToPayment() {
    this.route.navigate(['/pagamento']);
  }
}
