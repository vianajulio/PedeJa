import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/produto.model';
import { Router } from '@angular/router';
import { OrdersItemsComponent } from '../orders-items/orders-items.component';
import { OrderService } from '../../../../services/order.service';

declare var bootstrap: any;

@Component({
  selector: 'app-order',
  imports: [CommonModule, OrdersItemsComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  orderVisible = false;
  deliveryTax: number = 15;
  public orderItemsList: { product: Product; quantity: number }[] = [];

  @Input() paymentOrder = false;

  constructor(private route: Router, private orderService: OrderService) {
    this.orderService.order$.subscribe((order) => {
      this.orderItemsList = Array.from(order.orderItems.values());
    });
  }

  get total() {
    return this.orderItemsList.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  navigateToPayment() {
    const modalElement = document.getElementById('orders');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide(); // Fecha o modal corretamente
    }
    this.route.navigate(['/pagamento']);
  }
}
