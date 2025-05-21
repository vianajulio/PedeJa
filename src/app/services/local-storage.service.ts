import { Injectable } from '@angular/core';
import { Product } from '../models/produto.model';
import { OrderItems } from '../models/orderItem.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;
  private addressSubject: BehaviorSubject<string>;
  public address$;

  constructor() {
    this.storage = window.sessionStorage;
    this.addressSubject = new BehaviorSubject<string>(this.getAddressFromStorage());
    this.address$ = this.addressSubject.asObservable();
  }

  setOrder(value: OrderItems) {
    let valueJson = JSON.stringify(Array.from(value.orderItems));
    this.storage.setItem('order', valueJson);
  }

  getOrder(): OrderItems {
    const entries = JSON.parse(this.storage.getItem('order') || '[]');
    const orderItems = new Map<number, { product: Product; quantity: number }>(entries);
    return { orderItems };
  }

  private getAddressFromStorage(): string {
    return this.storage.getItem('address') ?? '';
  }

  setAddress(value: string) {
    this.storage.setItem('address', value);
    this.addressSubject.next(value);
  }

  getAddress(): string {
    return this.addressSubject.value;
  }
}