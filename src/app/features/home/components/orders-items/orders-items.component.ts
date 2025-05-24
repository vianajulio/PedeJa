import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../models/orderItem.model';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-orders-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-items.component.html',
  styleUrl: './orders-items.component.scss',
})
export class OrdersItemsComponent {
   public orderItemsList:  Order = {
       id: uuidv4(),
       order: [],
     };

  constructor(private orderService: OrderService) {
    this.orderService.order$.subscribe((order) => {
      this.orderItemsList = order;
    });
  }

  removeFromOrder(productId: number) {
    this.orderService.removeFromOrder(productId);
  }

  increaseItemQuantity(productId: number) {
    this.orderService.increaseItemQuantity(productId);
  }

  decreaseItemQuantity(productId: number) {
    this.orderService.decreaseItemQuantity(productId);
  }
}
