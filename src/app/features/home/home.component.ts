import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { Product } from '../../models/produto.model';
import { OrderComponent } from './components/order/order.component';
import { AddressModalComponent } from '../shared-components/address-modal/address-modal.component';
import { AddressComponent } from '../shared-components/address/address.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/orderItem.model';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageService } from '../../services/local-storage.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FoodCardComponent,
    OrderComponent,
    AddressComponent,
    AddressModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public products: Product[] = [
    {
      id: 0,
      name: 'Café',
      description: '150ml',
      price: 5.99,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG',
    },
    {
      id: 1,
      name: 'Bolo de Chocolate',
      description: '200g',
      price: 7.9,
      imageUrl:
        'https://static.itdg.com.br/images/640-440/bc6d909ad732d07c083985f2af551bec/284957-original.jpg',
    },
    {
      id: 2,
      name: 'Hamburger',
      description: 'Carne artesanal',
      price: 21.99,
      imageUrl:
        'https://static.itdg.com.br/images/640-440/49687a8a7a7110c7f560b9c7e96a9d0e/254679-shutterstock-364110890-1-.jpg',
    },
    {
      id: 3,
      name: 'Café Expresso',
      description: '50ml',
      price: 4.99,
      imageUrl:
        'https://villacafe.com.br/blog/wp-content/uploads/2016/03/villa-cafe-gourmet-para-site.jpg',
    },
    {
      id: 4,
      name: 'Latte',
      description: '300ml',
      price: 12.99,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/960px-Caffe_Latte_at_Pulse_Cafe.jpg',
    },
  ];

  public orderMap: Order = {
    id: uuidv4(),
    order: [],
  };

  get orderQty() {
    return (
      this.orderMap?.order?.reduce((sum, order) => sum + order.quantity, 0) ?? 0
    );
  }

  constructor(
    private orderService: OrderService,
    private localStorage: LocalStorageService
  ) {
    this.orderService.order$.subscribe((order) => {
      this.orderMap = order;
    });
  }

  addToOrder(product: Product) {
    this.orderService.addToOrder(product);
  }

  ngOnInit(): void {
    this.orderService.order$.subscribe((order) => {
      this.orderMap = order;
    });
    const toastMessage = this.localStorage.getToastMessage();
    console.log(toastMessage);

    if (toastMessage) {
      this.showToast('Pedido enviado com sucesso!', () => {
        this.localStorage.removeToastMessage();
      });
    }
  }

  showToast(message: string, afterToast?: () => void) {
    const toastEl = document.getElementById('finish-payment-toast');
    const toastMsg = document.getElementById('toast-message');

    if (toastEl && toastMsg) {
      toastMsg.textContent = message;

      const toast = bootstrap.Toast.getOrCreateInstance(toastEl);

      if (afterToast) {
        const handler = () => {
          afterToast();
          toastEl.removeEventListener('hidden.bs.toast', handler);
        };

        toastEl.addEventListener('hidden.bs.toast', handler);
      }

      toast.show();
    }
  }
}
