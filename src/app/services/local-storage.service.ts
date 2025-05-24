import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/orderItem.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;
  private addressSubject: BehaviorSubject<string>;
  public address$;

  constructor() {
    this.storage = window.sessionStorage;
    this.addressSubject = new BehaviorSubject<string>(
      this.getAddressFromStorage()
    );
    this.address$ = this.addressSubject.asObservable();
  }

  setOrder(value: Order) {
    const valueJson = JSON.stringify(value);
    this.storage.setItem('order', valueJson);
  }

  getOrder(): Order {
    const raw = this.storage.getItem('order');
    if (raw) {
      try {
        return JSON.parse(raw) as Order;
      } catch (e) {
        console.error('Erro ao parsear pedido do localStorage:', e);
      }
    }

    return {
      id: uuidv4(),
      order: [],
    };
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

  resetOrderLocalStorage() {
    this.storage.removeItem("order");
  }

  setToastMessage(message: string) {
    this.storage.setItem('toastMessage', message);
  }

  getToastMessage(): string | null {
    let message = this.storage.getItem('toastMessage');
    return message;
  }

  removeToastMessage(){
    this.storage.removeItem("toastMessage");
  }
  
}
