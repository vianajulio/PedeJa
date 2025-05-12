import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/produto.model';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input() orderItems: { product: Product; quantity: number }[] = [];

  @Output() remove = new EventEmitter<number>();
  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();

  orderVisible = false;
  deliveryTax: number = 15;


  get total(): number {
    return this.orderItems.reduce(
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
