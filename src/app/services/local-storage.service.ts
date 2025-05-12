import { Injectable } from '@angular/core';
import { Product } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  setOrder(value: Map<number, { product: Product; quantity: number }>) {
    let valueJson = JSON.stringify(Array.from(value.entries()));
    this.storage.setItem("order", valueJson);
  }

  getOrder(): Map<number, { product: Product; quantity: number }> {
    const entries = JSON.parse(this.storage.getItem("order") || '[]');
    return new Map<number, { product: Product; quantity: number }>(entries);
  }

  setAddress(value: string) {
    this.storage.setItem('address', value);
  }

  getAddress(): string {
    return this.storage.getItem('address') ?? "Insira um endereço.";
  }
}
