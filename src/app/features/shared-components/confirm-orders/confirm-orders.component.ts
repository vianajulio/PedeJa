import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../../home/components/order/order.component';

@Component({
  selector: 'app-confirm-orders',
  imports: [CommonModule, OrderComponent],
  templateUrl: './confirm-orders.component.html',
  styleUrl: './confirm-orders.component.scss',
})
export class ConfirmOrdersComponent {
  address: string = '';
  private subscription: Subscription;

  @Input() checkOrder!: boolean;

  @Output() checkOrderChange = new EventEmitter<boolean>();
  @Output() paymentOrderChange = new EventEmitter<boolean>();

  constructor(private localStorage: LocalStorageService) {
    this.subscription = this.localStorage.address$.subscribe((value) => {
      this.address = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeOrder(accepted: boolean = false) {
    this.checkOrderChange.emit(accepted);
    this.checkOrder = false;
  }

  acceptOrder() {
    this.closeOrder(true);
    this.paymentOrderChange.emit(true);
  }
}
