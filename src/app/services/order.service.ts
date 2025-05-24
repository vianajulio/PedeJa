import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, OrderItem } from '../models/orderItem.model';
import { Product } from '../models/produto.model';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _orderSubject = new BehaviorSubject<Order>({
    id: uuidv4(),
    order: [],
  });

  public order$ = this._orderSubject.asObservable();

  constructor(private localStorage: LocalStorageService) {
    const saved = this.localStorage.getOrder();
    if (saved) {
      this._orderSubject.next(saved);
    }
  }

  private emitChange(order: Order) {
    this.localStorage.setOrder(order);
    this._orderSubject.next(order);
  }

  get currentOrder(): Order {
    return this._orderSubject.value;
  }

  addToOrder(product: Product) {
    const current = this.currentOrder;
    const currentOrderList = Array.isArray(current.order) ? current.order : [];

    const existingItem = currentOrderList.find(
      (item) => item.product.id === product.id
    );

    let updatedOrder: OrderItem[];

    if (existingItem) {
      updatedOrder = currentOrderList.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedOrder = [...currentOrderList, { product, quantity: 1 }];
    }

    this.emitChange({ ...current, order: updatedOrder });
  }

  removeFromOrder(productId: number) {
    const current = this.currentOrder;
    const updatedOrder = current.order.filter(
      (item) => item.product.id !== productId
    );
    this.emitChange({ ...current, order: updatedOrder });
  }

  increaseItemQuantity(productId: number) {
    const current = this.currentOrder;
    const updatedOrder = current.order.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    this.emitChange({ ...current, order: updatedOrder });
  }

  decreaseItemQuantity(productId: number) {
    const current = this.currentOrder;
    const updatedOrder = current.order
      .map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    this.emitChange({ ...current, order: updatedOrder });
  }

  
}
