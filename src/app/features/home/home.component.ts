import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { Product } from '../../models/produto.model';
import { OrderComponent } from './components/order/order.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { AddressComponent } from "./components/address/address.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, FoodCardComponent, OrderComponent, AddressComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public products: Product[] = [
    { id: 0, name: 'Café', description: '150ml', price: 5.99 },
    { id: 1, name: 'Bolo de Chocolate', description: '200g', price: 7.9 },
    { id: 2, name: 'Hamburger', description: 'Carne artesanal', price: 21.99 },
    { id: 3, name: 'Café Expresso', description: '50ml', price: 4.99 },
    { id: 4, name: 'Latte', description: '300ml', price: 12.99 },
    { id: 5, name: 'Café 2', description: '150ml', price: 5.99 },
    { id: 6, name: 'Bolo de Chocolate 2', description: '200g', price: 7.9 },
    {
      id: 7,
      name: 'Hamburger 2',
      description: 'Carne artesanal',
      price: 21.99,
    },
    { id: 8, name: 'Café Expresso 2', description: '50ml', price: 4.99 },
    { id: 9, name: 'Latte 2', description: '300ml', price: 12.99 },
  ];

  public address?: string;

  public orderMap = new Map<number, { product: Product; quantity: number }>();

  constructor(private localStorage: LocalStorageService) {
    this.orderMap = localStorage.getOrder();
    this.address = localStorage.getAddress();
  }

  addToOrder(product: Product) {
    if (this.orderMap.has(product.id)) {
      const existing = this.orderMap.get(product.id)!;
      this.orderMap.set(product.id, {
        product,
        quantity: existing.quantity + 1,
      });
    } else {
      this.orderMap.set(product.id, { product, quantity: 1 });
    }
    this.localStorage.setOrder(this.orderMap);
  }

  get orderItems() {
    return Array.from(this.orderMap.values());
  }

  getTotalQuantity(
    map: Map<number, { product: Product; quantity: number }>
  ): number {
    let total = 0;
    map.forEach((item) => (total += item.quantity));
    return total;
  }

  removeFromOrder(productId: number) {
    this.orderMap.delete(productId);
    this.localStorage.setOrder(this.orderMap);
  }

  increaseItemQuantity(id: number) {
    const item = this.orderItems.find((i) => i.product.id === id);
    if (item) {
      item.quantity++;
    }
    this.localStorage.setOrder(this.orderMap);
  }

  decreaseItemQuantity(id: number) {
    const item = this.orderItems.find((i) => i.product.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else if (item) {
      this.removeFromOrder(id);
    }
    this.localStorage.setOrder(this.orderMap);
  }
}
