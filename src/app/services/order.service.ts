import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItems } from '../models/orderItem.model';
import { Product } from '../models/produto.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _orderSubject = new BehaviorSubject<OrderItems>({
    orderItems: new Map<number, { product: Product; quantity: number }>(),
  });

  public order$ = this._orderSubject.asObservable();

  constructor(private localStorage: LocalStorageService) {
    const saved = this.localStorage.getOrder();
    this._orderSubject.next(saved);
  }

  private emitChange(order: OrderItems) {
    this.localStorage.setOrder(order);
    this._orderSubject.next(order);
  }

  get currentOrder(): OrderItems {
    return this._orderSubject.value;
  }

  addToOrder(product: Product) {
    const updatedMap = new Map(this.currentOrder.orderItems);
    const existing = updatedMap.get(product.id);
    updatedMap.set(product.id, {
      product,
      quantity: existing ? existing.quantity + 1 : 1,
    });
    this.emitChange({ orderItems: updatedMap });
  }

  removeFromOrder(productId: number) {
    const updatedMap = new Map(this.currentOrder.orderItems);
    updatedMap.delete(productId);
    this.emitChange({ orderItems: updatedMap });
  }

  increaseItemQuantity(productId: number) {
    const updatedMap = new Map(this.currentOrder.orderItems);
    const item = updatedMap.get(productId);
    if (item) {
      item.quantity++;
      updatedMap.set(productId, item);
      this.emitChange({ orderItems: updatedMap });
    }
  }

  decreaseItemQuantity(productId: number) {
    const updatedMap = new Map(this.currentOrder.orderItems);
    const item = updatedMap.get(productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        updatedMap.set(productId, item);
      } else {
        updatedMap.delete(productId);
      }
      this.emitChange({ orderItems: updatedMap });
    }
  }
}