import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/produto.model';
import { OrderItems } from '../../../../models/orderItem.model';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-orders-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-items.component.html',
  styleUrl: './orders-items.component.scss',
})
export class OrdersItemsComponent {
   public orderItemsList: { product: Product; quantity: number }[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.order$.subscribe((order) => {
      this.orderItemsList = Array.from(order.orderItems.values());
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
