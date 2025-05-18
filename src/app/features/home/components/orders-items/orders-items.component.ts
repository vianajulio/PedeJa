import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/produto.model';
import { OrderItems } from '../../../../models/orderItem.model';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-orders-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-items.component.html',
  styleUrl: './orders-items.component.scss',
})
export class OrdersItemsComponent {
  private _orderItems: OrderItems = {
    orderItems: new Map<number, { product: Product; quantity: number }>(),
  };

  @Input() set order(value: OrderItems) {
    this._orderItems = {
      orderItems: new Map(value.orderItems),
    };
  }

  @Output() orderItemsChange = new EventEmitter<OrderItems>();

  constructor(private localStorage: LocalStorageService) {
    this._orderItems = this.localStorage.getOrder();
  }

  addToOrder(product: Product) {
    const map = this._orderItems.orderItems;
    if (map.has(product.id)) {
      const existing = map.get(product.id)!;
      map.set(product.id, {
        product,
        quantity: existing.quantity + 1,
      });
    } else {
      map.set(product.id, { product, quantity: 1 });
    }

    this.emitChange();
  }

  removeFromOrder(productId: number) {
    this._orderItems.orderItems.delete(productId);
    this.emitChange();
  }

  increaseItemQuantity(id: number) {
    const item = this._orderItems.orderItems.get(id);
    if (item) {
      item.quantity++;
      this.emitChange();
    }
  }

  decreaseItemQuantity(id: number) {
    const item = this._orderItems.orderItems.get(id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this._orderItems.orderItems.delete(id);
      }
      this.emitChange();
    }
  }

  get orderItemsList() {
    return Array.from(this._orderItems.orderItems.values());
  }

  getTotalQuantity(): number {
    const updated = {
      orderItems: new Map(this._orderItems.orderItems),
    };
    this.orderItemsChange.emit(updated);
    
    let total = 0;
    this._orderItems.orderItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }

  private emitChange() {
    const updated = {
      orderItems: new Map(this._orderItems.orderItems),
    };
    this.orderItemsChange.emit(updated);
    this.localStorage.setOrder(this._orderItems);
  }
}
