import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersItemsComponent } from '../orders-items/orders-items.component';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../models/orderItem.model';
import {v4 as uuidv4} from 'uuid';

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
  public orderItemsList: Order = {
    id: uuidv4(),
    order: [],
  };

  @Input() paymentOrder = false;

  constructor(private route: Router, private orderService: OrderService) {
    this.orderService.order$.subscribe((order) => {
      this.orderItemsList = order;
    });
  }

  get total() {
    return this.orderItemsList.order.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get hasOrderItems(){
    return this.orderItemsList?.order?.length > 0;
  }

  navigateToPayment() {
    const modalElement = document.getElementById('orders');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
    this.route.navigate(['/pagamento']);
  }
}
